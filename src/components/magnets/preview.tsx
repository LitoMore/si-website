import {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import type {MagnetModel, MagnetSettings} from './geometry.js';
import {useMagnetI18n} from './i18n.js';
import {createPreviewGeometry} from './preview-geometry.js';
import {createPreviewLighting} from './preview-lighting.js';
import {createPreviewMaterials} from './preview-materials.js';

type PreviewView = {
	position: THREE.Vector3;
	target: THREE.Vector3;
	zoom: number;
};

type PreviewResetAnimation = {
	startedAt: number;
	duration: number;
	fromTarget: THREE.Vector3;
	toTarget: THREE.Vector3;
	fromOrbit: THREE.Spherical;
	toOrbit: THREE.Spherical;
	fromZoom: number;
	toZoom: number;
};

export default function Preview({
	model,
	settings,
	isFront,
	reset,
}: {
	readonly model: MagnetModel;
	readonly settings: MagnetSettings;
	readonly isFront: boolean;
	readonly reset: number;
}) {
	const {labels} = useMagnetI18n();
	const hostRef = useRef<HTMLDivElement>(null);
	const resetViewRef = useRef<() => void>(undefined);
	const [error, setError] = useState(false);
	const colorsRef = useRef({
		base: settings.baseColor,
		logo: settings.iconColor,
	});
	const materialsRef = useRef<{
		base: ReturnType<typeof createPreviewMaterials>;
		logo: ReturnType<typeof createPreviewMaterials>;
	}>(undefined);
	useEffect(() => {
		colorsRef.current = {base: settings.baseColor, logo: settings.iconColor};
		for (const part of ['base', 'logo'] as const) {
			for (const material of materialsRef.current?.[part] ?? []) {
				material.color.set(colorsRef.current[part]);
			}
		}
	}, [settings.baseColor, settings.iconColor]);
	useEffect(() => {
		if (!hostRef.current) {
			return;
		}

		const element = hostRef.current;
		let renderer: THREE.WebGLRenderer;
		try {
			renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
		} catch {
			queueMicrotask(() => {
				setError(true);
			});
			return;
		}

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 2000);
		camera.up.set(0, 0, 1);
		const size = Math.max(model.width, model.height);
		camera.position.set(
			0,
			isFront ? 0 : -size * 0.92,
			size * (isFront ? 2.8 : 2.4),
		);
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.target.set(0, 0, settings.baseHeight / 2);
		controls.enableDamping = true;
		controls.enablePan = false;
		controls.minDistance = size * 1.2;
		controls.maxDistance = size * 6;
		controls.maxPolarAngle = Math.PI * 0.49;
		const homeDirection = camera.position
			.clone()
			.sub(controls.target)
			.normalize();
		// Interpolate in OrbitControls' coordinate system, with camera.up as north.
		const orbitRotation = new THREE.Quaternion().setFromUnitVectors(
			camera.up,
			new THREE.Vector3(0, 1, 0),
		);
		const inverseOrbitRotation = orbitRotation.clone().invert();
		let homeView: PreviewView | undefined;
		let resetAnimation: PreviewResetAnimation | undefined;
		const cancelViewReset = () => {
			resetAnimation = undefined;
			controls.enabled = true;
		};

		renderer.domElement.addEventListener('pointerdown', cancelViewReset, {
			capture: true,
		});
		renderer.domElement.addEventListener('wheel', cancelViewReset, {
			capture: true,
		});
		resetViewRef.current = () => {
			if (!homeView) return;
			const currentView = {
				position: camera.position.clone(),
				target: controls.target.clone(),
				zoom: camera.zoom,
			};
			// Flush pending orbit damping without changing the visible starting pose.
			controls.enableDamping = false;
			controls.update();
			controls.enableDamping = true;
			camera.position.copy(currentView.position);
			controls.target.copy(currentView.target);
			camera.zoom = currentView.zoom;
			camera.updateProjectionMatrix();
			camera.lookAt(controls.target);
			if (globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches) {
				cancelViewReset();
				camera.position.copy(homeView.position);
				controls.target.copy(homeView.target);
				camera.zoom = homeView.zoom;
				camera.updateProjectionMatrix();
				camera.lookAt(controls.target);
				return;
			}

			const fromOrbit = new THREE.Spherical().setFromVector3(
				currentView.position
					.clone()
					.sub(currentView.target)
					.applyQuaternion(orbitRotation),
			);
			const toOrbit = new THREE.Spherical().setFromVector3(
				homeView.position
					.clone()
					.sub(homeView.target)
					.applyQuaternion(orbitRotation),
			);
			const thetaDelta =
				THREE.MathUtils.euclideanModulo(
					toOrbit.theta - fromOrbit.theta + Math.PI,
					Math.PI * 2,
				) - Math.PI;
			toOrbit.theta = fromOrbit.theta + thetaDelta;
			resetAnimation = {
				startedAt: performance.now(),
				duration: 850,
				fromTarget: currentView.target,
				toTarget: homeView.target.clone(),
				fromOrbit,
				toOrbit,
				fromZoom: currentView.zoom,
				toZoom: homeView.zoom,
			};
			controls.enabled = false;
		};

		const {hemisphere, key, rim} = createPreviewLighting();
		scene.add(hemisphere, key, rim);
		const baseGeometry = createPreviewGeometry(model.base);
		const logoGeometry = createPreviewGeometry(model.logo);
		const baseMaterials = createPreviewMaterials(
			colorsRef.current.base,
			'base',
		);
		const logoMaterials = createPreviewMaterials(
			colorsRef.current.logo,
			'logo',
		);
		materialsRef.current = {base: baseMaterials, logo: logoMaterials};
		scene.add(
			new THREE.Mesh(baseGeometry, [...baseMaterials]),
			new THREE.Mesh(logoGeometry, [...logoMaterials]),
		);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setClearColor(0x00_00_00, 0);
		renderer.outputColorSpace = THREE.SRGBColorSpace;
		element.append(renderer.domElement);
		const resize = new ResizeObserver(() => {
			const {width, height} = element.getBoundingClientRect();
			if (width === 0 || height === 0) {
				return;
			}

			cancelViewReset();
			renderer.setSize(width, height);
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			// Expanding position controls can make the viewport taller. Fit both
			// axes so a circle or square stays fully visible in the narrower view.
			const halfVertical = THREE.MathUtils.degToRad(camera.fov) / 2;
			const halfHorizontal = Math.atan(Math.tan(halfVertical) * camera.aspect);
			const radius =
				Math.hypot(
					model.width,
					model.height,
					settings.baseHeight + settings.reliefHeight,
				) / 2;
			const distance =
				(radius / Math.sin(Math.min(halfVertical, halfHorizontal))) * 1.08;
			const direction = camera.position
				.clone()
				.sub(controls.target)
				.normalize();
			camera.position
				.copy(controls.target)
				.addScaledVector(direction, distance);
			controls.maxDistance = Math.max(size * 6, distance * 2);
			controls.update();
			homeView = {
				position: controls.target
					.clone()
					.addScaledVector(homeDirection, distance),
				target: controls.target.clone(),
				zoom: camera.zoom,
			};
		});
		resize.observe(element);
		const resetOffset = new THREE.Vector3();
		const resetOrbit = new THREE.Spherical();
		renderer.setAnimationLoop((time) => {
			if (resetAnimation) {
				// Match badge3d's damping response and smoothly settle within 850 ms.
				const elapsedProgress = THREE.MathUtils.clamp(
					(time - resetAnimation.startedAt) / resetAnimation.duration,
					0,
					1,
				);
				const elapsedSeconds =
					(elapsedProgress * resetAnimation.duration) / 1000;
				const dampingRemaining =
					(1 - THREE.MathUtils.clamp(controls.dampingFactor, 0.01, 0.99)) **
					(elapsedSeconds * 60 * 1.6);
				const settlingWindow = THREE.MathUtils.smootherstep(
					elapsedProgress,
					0,
					1,
				);
				const progress = 1 - dampingRemaining * (1 - settlingWindow);
				resetOrbit.radius = Math.exp(
					THREE.MathUtils.lerp(
						Math.log(resetAnimation.fromOrbit.radius),
						Math.log(resetAnimation.toOrbit.radius),
						progress,
					),
				);
				resetOrbit.phi = THREE.MathUtils.lerp(
					resetAnimation.fromOrbit.phi,
					resetAnimation.toOrbit.phi,
					progress,
				);
				resetOrbit.theta = THREE.MathUtils.lerp(
					resetAnimation.fromOrbit.theta,
					resetAnimation.toOrbit.theta,
					progress,
				);
				controls.target.lerpVectors(
					resetAnimation.fromTarget,
					resetAnimation.toTarget,
					progress,
				);
				camera.position
					.copy(resetOffset.setFromSpherical(resetOrbit))
					.applyQuaternion(inverseOrbitRotation)
					.add(controls.target);
				camera.zoom = THREE.MathUtils.lerp(
					resetAnimation.fromZoom,
					resetAnimation.toZoom,
					progress,
				);
				camera.updateProjectionMatrix();
				camera.lookAt(controls.target);
				if (elapsedProgress >= 1) cancelViewReset();
			} else {
				controls.update();
			}

			renderer.render(scene, camera);
		});
		return () => {
			resetViewRef.current = undefined;
			materialsRef.current = undefined;
			resize.disconnect();
			renderer.setAnimationLoop(null);
			renderer.domElement.removeEventListener('pointerdown', cancelViewReset, {
				capture: true,
			});
			renderer.domElement.removeEventListener('wheel', cancelViewReset, {
				capture: true,
			});
			controls.dispose();
			baseGeometry.dispose();
			logoGeometry.dispose();
			for (const material of [...baseMaterials, ...logoMaterials]) {
				material.dispose();
			}

			renderer.dispose();
			renderer.forceContextLoss();
			renderer.domElement.remove();
		};
	}, [model, settings.baseHeight, settings.reliefHeight, isFront]);
	useEffect(() => {
		resetViewRef.current?.();
	}, [reset]);
	return (
		<div
			ref={hostRef}
			aria-label={labels.previewLabel}
			className="three-preview"
		>
			{error ? (
				<p className="preview-error">{labels.previewUnavailable}</p>
			) : null}
		</div>
	);
}
