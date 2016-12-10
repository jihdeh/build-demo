import supertest from "supertest-as-promised";
import App from "../server/app";

let app = App();
let request = supertest.agent(app.listen());

describe("Stats API test", () => {

    it("should return a single build", (done) => {
    	request.get(`/api/v1/stats/432462`) //432462 gotten from config file
    		.expect(200)
    		.expect("Content-Type", /json/)
    		.then(body => {
		    	expect(typeof body).toBe("object");
    		});

    	done();
    });
});
