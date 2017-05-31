(function () {

  function Page (html) {

    this.dom = html;

    this.isActive = function (index, current) {

      if (index == current) {
        this.dom.setAttribute("isActive", true);
      }
      else {
        this.dom.setAttribute("isActive", false);
      }

    }

    this.setClasses = function (index, current) {

      var isActive = this.dom.getAttribute("isActive");
      // 
      // if (isActive == "true") {
      //   this.dom.className = "thing center";
      // }
      // else if (index < current) {
      //   this.dom.className = "thing left";
      // }
      // else if (index > current) {
      //   this.dom.className = "thing right";
      // }

      if (isActive == "true") {
        this.dom.className = "thing show";
      }
      else {
        this.dom.className = "thing hide";
      }

    }

  }

  function begin () {

    var things = document.querySelectorAll(".thing");
    var next = document.querySelector(".next");
    var back = document.querySelector(".back");
    var position = 0;

    function update () {

      for(var i = 0; i < things.length; i++) {
        var thing = new Page(things[i]);
        thing.isActive(i, position);
        thing.setClasses(i, position);
      }

    }

    function listening () {

      next.addEventListener("click", function () {
        if (position < (things.length - 1)) {
          position++;
          update();
        }
      });

      back.addEventListener("click", function () {
        if (position > 0) {
          position--;
          update();
        }
      });

    }

    update();
    listening();

  }

  begin();

})()
