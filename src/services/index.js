import axios from "axios";

let Service = axios.create({
    baseURL: "http://localhost:3001/",
    timeout: 6000,
});

let PDF = {
    async getPDF(data) {
        try {
            return Service.post("pdf/generate-pdf", data);
        } catch (error) {
            let detailedError = {
                functionName: "PDF - getPDF",
                place: place,
                data: data,
                error: error,
            };
            console.warn(detailedError);
        }
    },
}
export { PDF };