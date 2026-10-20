import {type ReactNode, createContext, useContext} from 'react';
import {DirectionProvider} from '@base-ui/react/direction-provider';
import {Tooltip} from '@base-ui/react/tooltip';

export type SurfaceTheme = 'light' | 'dark';
export const SurfaceThemeContext = createContext<SurfaceTheme>('light');
export const useSurfaceTheme = () => useContext(SurfaceThemeContext);

export function UiProvider({
	children,
	theme,
	direction,
}: {
	readonly children: ReactNode;
	readonly theme: SurfaceTheme;
	readonly direction: 'ltr' | 'rtl';
}) {
	return (
		<SurfaceThemeContext value={theme}>
			<DirectionProvider direction={direction}>
				<Tooltip.Provider delay={100}>{children}</Tooltip.Provider>
			</DirectionProvider>
		</SurfaceThemeContext>
	);
}
