import { ClientResponseError } from 'pocketbase';

interface PBErrorData {
	[field: string]: {
		code: string;
		message: string;
	};
}

interface FormErrorMessages {
	[field: string]: { [code: string]: string };
}

export type ProcessedError = {
	status: number;
	message: string;
	fieldsError?: Record<string, string>;
};

/**
 * Processes an error and returns a processed error object.
 * Note: When an error is not translated in formErrorMessages, a general error will be thrown containing the information about where to add this translation in the object.
 */
export function processError(error: any, formErrorMessages: FormErrorMessages): ProcessedError {
	let fieldsError: any = {};

	if (error instanceof ClientResponseError && Object.keys(error.response.data).length) {
		fieldsError = Object.fromEntries(
			Object.entries(error.response.data as PBErrorData).map(
				([fieldName, { code: fieldErrorCode }]) => {
					const fieldErrorMessage =
						formErrorMessages[fieldName]?.[fieldErrorCode] ||
						`Une erreur est survenue. (code: ${fieldName}/${fieldErrorCode})`;

					return [fieldName, fieldErrorMessage];
				}
			)
		);
	}

	const errorStatus = error.status ?? 400;
	return {
		status: errorStatus,
		message:
			formErrorMessages.status?.[errorStatus] ?? `Une erreur est survenue. (code: ${errorStatus})`,
		...(fieldsError && { fieldsError })
	};
}
