import { createUrl, deleteUrl } from "../../api/user-url";
import { openUrl } from "../../api/user-url";

export class UrlServices {

    constructor() {

    }

    async addAnUrl(data: { userId?: string, longUrl: string }) {
        let userToken = structuredClone(data)
        if (!userToken.userId) userToken = { ...userToken, userId: import.meta.env.VITE_DEFAULT_USER_ID };

        return await createUrl(userToken).then((res) => {
            return res;
        }).catch((err) => {
            throw new Error(err.response.data);
        });


    }

    async openUrl(key: string) {
        return await openUrl(key).then((res) => {
            return res.url;
        }
        ).catch((err) => {
            throw new Error(err.response.data);
        });

    }

    async removeUrl(id: string, onError: (error: string) => void, onSuccess: () => void) {
        const { response, error } = await deleteUrl(id);
        if (error) return onError(error);
        if (response) onSuccess();
        return response;

    }

}
