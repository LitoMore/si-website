import {DirectionalLight, HemisphereLight} from 'three';

export function createPreviewLighting() {
	// Match badge3d's preview rig. Caps retain their color independently of these
	// lights; the standard-material walls receive the warm fill, key and rim.
	const hemisphere = new HemisphereLight(0xff_f4_dd, 0x14_16_18, 2.15);
	const key = new DirectionalLight(0xff_ff_ff, 3.8);
	key.position.set(-25, -20, 52);
	const rim = new DirectionalLight(0xff_9f_43, 2.4);
	rim.position.set(35, 15, 25);
	return {hemisphere, key, rim};
}
