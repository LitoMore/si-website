import {type ReactNode} from 'react';
import {Toast} from '@base-ui/react/toast';
import {IconCheck, IconX} from '@tabler/icons-react';

const toastManager = Toast.createToastManager();
export const message = {
	success(title: string) {
		toastManager.add({title, type: 'success', timeout: 3000});
	},
	error(title: string) {
		toastManager.add({title, type: 'error', priority: 'high', timeout: 5000});
	},
};

function Messages() {
	const {toasts} = Toast.useToastManager();
	return (
		<Toast.Portal>
			<Toast.Viewport className="ui-toast-viewport">
				{toasts.map((toast) => (
					<Toast.Root key={toast.id} className="ui-toast" toast={toast}>
						{toast.type === 'error' ? (
							<IconX aria-hidden className="ui-error-icon" size={16} />
						) : (
							<IconCheck aria-hidden className="ui-success-icon" size={16} />
						)}
						<Toast.Content>
							<Toast.Title>{toast.title}</Toast.Title>
						</Toast.Content>
					</Toast.Root>
				))}
			</Toast.Viewport>
		</Toast.Portal>
	);
}

export function MessageProvider({children}: {readonly children: ReactNode}) {
	return (
		<Toast.Provider limit={3} toastManager={toastManager}>
			{children}
			<Messages />
		</Toast.Provider>
	);
}

export function Spinner() {
	return <span aria-hidden className="ui-spinner" />;
}

export function Alert({
	title,
	action,
}: {
	readonly title: string;
	readonly action?: ReactNode;
}) {
	return (
		<div className="ui-alert" role="alert">
			<span>{title}</span>
			{action}
		</div>
	);
}
