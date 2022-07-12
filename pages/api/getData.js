// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    try {
        const response = axios.get('https://mock-api-repo.netlify.app/api/getExam.json');
        console.log(response);
        res.status(200).json(response);
    } catch (e) {
        console.log(e);
        res.statusCode = 500;
    }
}