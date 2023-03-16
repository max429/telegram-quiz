import axios from "axios";

export function fetchStoryWithTestById(storyId: string) {
    return new Promise<{testQuestions: any; story: string}>((resolve, reject) => {
        const url = `http://localhost:3000/api/stories/english/${storyId}`;
        axios.get(url).then((resp) => {
            resolve(resp.data);
        }).catch((error) => {
            console.log('fetchStoryWithTestByIdError', error);
        })
    })
}

export function checkStoryAnswers(storyId:string, answers: string[]) {
    return new Promise<{errorIndices: number[]}>((resolve, reject) => {
        const url = `http://localhost:3000/api/stories/english/check/`;
        axios.post(url, {
            id: storyId,
            answers,
        }).then((resp) => {
            resolve(resp.data);
        }).catch((error) => {
            console.log('fetchStoryWithTestByIdError', error);
        })
    })
}
