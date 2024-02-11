import {getCurrentUser, getWithToken} from "./auth.tsx";
import Endpoints from "./endpoints.tsx";

export type GroupType = {
    _id: number,
    name: string,
    description: string,
    members: any[],
    owner: number,
    domain: string | null,

}

export const getCurrentGroups = async () => {
    const current_user = await getCurrentUser();

    if (current_user === undefined) {
        window.location.href = "/auth/signin"
        return;
    }


    const response = await getWithToken(Endpoints.USERS_GET_GROUPS,
        {
            "_id": current_user._id
        }
    );

    if (response === undefined) {
        return []
    }

    let result = [];
    const groups_id: number[] = response.data.response.result;
    for (let i = 0; i < groups_id.length; ++i) {
        let group_id = groups_id[i];
        const group = await getWithToken(Endpoints.GROUPS_GET,
            {
                "_id": group_id
            })
        if (group != undefined) {
            result.push(group.data.response)
        }
    }
    return result;
}

export const getGroupById = async (_id: number): Promise<undefined | GroupType> => {
    const current_user = await getCurrentUser();

    if (current_user === undefined) {
        window.location.href = "/auth/signin";
        return;
    }

    const response = await getWithToken(Endpoints.GROUPS_GET, {
            "_id": _id
        }
    );

    if (response === undefined) {
        return undefined;
    }

    return response.data.response;
}