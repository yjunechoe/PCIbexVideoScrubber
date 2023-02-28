PennController.ResetPrefix()
var showProgressBar = false;

PennController.Sequence("counter", "experiment", SendResults())

SetCounter("counter", "inc", 1);

Template("template.csv", row =>
  newTrial("experiment",
    newVideo("video", "https://github.com/yjunechoe/PCIbexVideoScrubber/raw/main/stimuli/videos/" + row.item + ".mp4")
        .once()
        .play()
        .css({
            "width": 400,
            "height": 300
        })
        .cssContainer({
          "margin-bottom": "20px"
        })
        .center()
        .print()
        .wait()
    ,
    newVideoScrubber("slider-input", row.item, row.video_frames)
        .center()
        .print()
        .log()
    ,
    newButton("Next")
        .print()
        .center()
        .wait(
          getVideoScrubber("slider-input")
            .test.selected()
        )
  )
  .log("item", row.item)
  .log("video_frames", row.video_frames)
  .log("group", row.group)
)
