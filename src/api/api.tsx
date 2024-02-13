import axios from "axios";
import {getCurrentUser, getWithToken, postWithToken} from "./auth.tsx";
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

export const getGroupContests = async (group_id: number) => {

    const current_user = await getCurrentUser();

    if (current_user === undefined) {
        window.location.href = "/auth/signin";
        return;
    }


    const response = await getWithToken(Endpoints.GROUPS_GET_CONTESTS, {
        "group_id": group_id
    })

    if (response === undefined) {
        return undefined;
    }
    console.log(response.data.response.contests);
    return response.data.response.contests
}

export type ContestType = {
    name: string,
    description: string,
    domain: string | null,
    tasks: number[],
    linked_group: number
}

export const getContestById = async (_id: number) => {

    const current_user = await getCurrentUser();

    if (current_user === undefined) {
        window.location.href = "/auth/signin";
        return;
    }

    const response = await getWithToken(Endpoints.CONTESTS_GET, {
        "_id": _id
    })

    if (response === undefined) {
        return undefined;
    }

    return response.data.response;
}

export const getContestProblemsResources = async(contest_id: number): Promise<any> => {

    const current_user = await getCurrentUser();

    if (current_user === undefined) {
        window.location.href = "/auth/signin";
        return;
    }


    const problems = (await getContestById(contest_id)).problems;

    if (problems === undefined) {
        return undefined
    }

    let result = []

    for (let i = 0; i < problems.length; ++i) {
        const task_id = problems[i];
        const legend_response = await getWithToken(Endpoints.PROBLEMS_GET_LEGEND, {
            "_id": task_id
        })
        const input_response = await getWithToken(Endpoints.PROBLEMS_GET_INPUT, {
            "_id": task_id
        })
        const output_response = await getWithToken(Endpoints.PROBLEMS_GET_OUTPUT, {
            "_id": task_id
        })
        const scoring_response = await getWithToken(Endpoints.PROBLEMS_GET_SCORING, {
            "_id": task_id
        })
        const notes_response = await getWithToken(Endpoints.PROBLEMS_GET_NOTES, {
            "_id": task_id
        })
        const task_name_response = await getWithToken(Endpoints.PROBLEMS_GET_NAME, {
            "_id": task_id
        })
        const examples_response = await getWithToken(Endpoints.PROBLEMS_GET_EXAMPLES, {
            "_id": task_id
        })

        if (!(legend_response && input_response && output_response && scoring_response && notes_response)) {
            return undefined;
        }

        result.push({
            name: task_name_response?.data,
            legend: legend_response?.data,
            input: input_response?.data, 
            output: output_response?.data,
            scoring: scoring_response?.data,
            notes: notes_response?.data,
            id: task_id,
            examples_input: examples_response?.data.response.input,
            examples_output: examples_response?.data.response.output,
        })
    }

    return result;
}

export const sendSolution = async(contest_id: number, problem_id: number, solution: string): Promise<"OK" | undefined> => {

    const current_user = await getCurrentUser();

    if (current_user === undefined) {
        window.location.href = "/auth/signin";
        return;
    }

    const response = await postWithToken(Endpoints.SUBMISSIONS_CREATE, {
        contest_id: contest_id,
        problem_id: problem_id,
        solution: solution
    })


    if (response === undefined) {
        return undefined
    }
    return "OK"
}