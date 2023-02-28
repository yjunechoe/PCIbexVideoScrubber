window.PennController._AddElementType("VideoScrubber", function(PennEngine) {
    
  this.immediate = function(id, item = "cake", imgFrames = "33;3", width = 400, height = 300){
      
      this.id = id;
      this.dims = [width, height];

      const itemImgPath = "https://raw.githubusercontent.com/yjunechoe/PCIbexVideoScrubber/main/stimuli/images/" + item + "/" + item
      const imgFramesParsed = imgFrames.split(";").map(Number)
      this.imgCompletions = Array(imgFramesParsed[0]).fill().map( (v,i) => Math.min(i * imgFramesParsed[1], 99) )
      this.imgPathArray = this.imgCompletions.map(x => itemImgPath + String(x).padStart(2, "0") + ".jpg")
      
      // preload images
      this.imgArray = this.imgPathArray.map(d => {
          let imgObj = new Image();
          imgObj.src = d;
          return imgObj;
      })

      // selections
      this.selected = false;
// 
  }
      
  // render
  this.uponCreation = function(resolve){
    
      that = this

      const imgFrameDiv = $("<div>")
        .attr("class", "PennController-VideoScrubber-FrameDiv")
        .css({
          "position": "relative",
          "width": this.dims[0],
          "height": this.dims[1]
        })
      
      this.imgArray.forEach((img) => {
          imgFrameDiv
              .append(
                  $("<div class='PennController-VideoScrubber-Frame'>")
                      .css("visibility", "hidden")
                      .append(
                        $(img)
                          .css({
                            "position": "absolute",
                            "width": this.dims[0],
                            "height": this.dims[1],
                            "object-fit": "contain"
                          })
                      )
              )
      })

      const sliderDiv = $("<div>")
        .attr("class", "PennController-VideoScrubber-Slider")
        .css({
          "width" : "100%"
        })

      const slider = $("<input type='range' min='1' max='" + this.imgArray.length + "' value='1'>")
            .attr("class", "PennController-VideoScrubber-SliderInput")
            .css({
              "width" : "100%",
              "height": 50
            })
            .change(function(){
              $(".PennController-VideoScrubber-Frame").css("visibility", "hidden")
              $(`.PennController-VideoScrubber-Frame:nth-child(${this.value})`).css("visibility", "visible")
              that.selected = this.value
            })

      sliderDiv.append(slider)

      this.jQueryElement = $("<div>")
        .attr("class", "PennController-VideoScrubber")
      
      this.jQueryElement.append(imgFrameDiv)
      this.jQueryElement.append(sliderDiv)
      
      resolve();

  };
  
  this.end = function(){
    if (this.log) {
      const selectedCompletion = this.imgCompletions[this.selected - 1]
      console.log(selectedCompletion)
      PennEngine.controllers.running.save(this.type, this.id, "SelectedFrame", selectedCompletion, this.printTime, "NULL")
    }
  };

  this.test = {
    selected: function(correct = "any") {
      if (this.selected === false) {
        alert("Please make a selection.")
        return false
      } else {
        if (correct == "any" | correct == this.selected) {
          return true
        } else {
          alert("Incorrect selection.")
          return false
        }
      }
    }
  };
  
  this.actions = {
  };

})