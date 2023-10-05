const express = require("express");
const router = express.Router();

const Tutorial = require("../schema/tutorialSchema");

router.post("/addvideo", async (request, response) => {
  try {
    const {
      video_name,
      video_description,
      duration,
      category,
      //   images,
      video_url,
    } = request.body;

    const addNewTutorial = new Tutorial({
      video_name,
      video_description,
      duration,
      category,
      //   images,
      video_url,
    });

    const addedTutorial = await addNewTutorial.save();

    response.status(201);
    response.json({
      message: "Video Added Successfully",
      AddedVideo: addedTutorial,
    });
  } catch (error) {
    response.status(500);
    response.send("Internal Server Error");
    console.log(error);
  }
});

router.get("/", async (request, response) => {
  try {
    const getAllVideosQuery = await Tutorial.find();
    response.status(200).json(getAllVideosQuery);
  } catch (error) {
    response.status(500);
    response.send("Internal Server Error");
    console.log(error);
  }
});

router.get("/:id", async (request, response) => {
  const { id } = request.params;
  console.log(id);
  try {
    const getVideoQuery = await Tutorial.findById(id);
    if (getVideoQuery === null) {
      response.status(404).json({
        Message: "The ID Which You Have Provided Is Not Found With Tutorial ID",
      });
    } else {
      response.status(200).json({ getVideo });
    }
  } catch (error) {
    response.status(500);
    response.send("Internal Server Error");
    console.log(error);
  }
});

router.put("/:id", async (request, response) => {
  const { id } = request.params;
  const updatedItem = request.body;

  try {
    const checkVideoQuery = await Tutorial.findById(id);
    if (checkVideoQuery === null) {
      response.status(404).json({
        Message: "The ID Which You Have Provided Is Not Found With Tutorial ID",
      });
    } else {
      const updateVideoQuery = await Tutorial.findByIdAndUpdate(
        id,
        updatedItem
      );
      response.status(202).json({
        message: "Updated Successfully",
        data: updateVideoQuery,
      });
    }
  } catch (error) {
    response.status(500);
    response.send("Internal Server Error");
    console.log(error);
  }
});

router.delete("/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const checkVideoQuery = await Tutorial.findById(id);
    if (checkVideoQuery === null) {
      response.status(404).json({
        Message: "The ID Which You Have Provided Is Not Found With Tutorial ID",
      });
    } else {
      const deleteVideoQuery = await Tutorial.findByIdAndRemove(id);
      response.status(200).json({
        Message: "Video Deleted Successfully",
        DeletedMovie: deleteVideoQuery,
      });
    }
  } catch (error) {
    response.status(500);
    response.send("Internal Server Error");
    console.log(error);
  }
});

module.exports = router;
