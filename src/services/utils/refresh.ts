import needle from "needle";
import { config } from "../../config";

export const getToken = async () => {
	const url = config.envVars.api.map.apiTokenURL || "";
	const apiGrantName = config.envVars.api.map.apiGrantName || "";
	const apiGrantValue = config.envVars.api.map.apiGrantValue || "";
	const apiClientName = config.envVars.api.map.apiClientName || "";
	const apiClientValue = config.envVars.api.map.apiClientValue || "";
	const apiSecretName = config.envVars.api.map.apiSecretName || "";
	const apiSecretValue = config.envVars.api.map.apiSecretValue || "";
	const body: { [key: string]: string } = {};
	body[`${apiGrantName}`] = apiGrantValue;
	body[`${apiClientName}`] = apiClientValue;
	body[`${apiSecretName}`] = apiSecretValue;
	return await needle("get", url, { ...body });
};
