import express from "express";
import * as notes from "./notes.js";
import request from "request";

const router = express.Router();

router.get("/notes", notes.list); // list
router.post("/notes", notes.create); // create
router.get("/notes/:id", notes.read); // read
router.post("/notes/:id", notes.update); // update
router.delete("/notes/:id", notes.deleteNote); // delete
router.get("/posts", (req, res) => {
  request(
    "https://jsonplaceholder.typicode.com/posts",
    (error, response, body) => {
      if (!error && response.statusCode == 200) {
        res.json(body);
      }
    }
  );
});

export default router;
