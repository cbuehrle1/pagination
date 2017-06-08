(function () {

  document.addEventListener("DOMContentLoaded", function() {
    begin();
  });

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

    this.setName = function (index) {
      this.dom.setAttribute("name", 'section' + index);
    }

    this.setClasses = function (index, current) {

      var isActive = this.dom.getAttribute("isActive");

      if (isActive == "true") {
        this.dom.className = "ContentCard showMe";
      }
      else {
        this.dom.className = "ContentCard dontShowMe";
      }

    }

  }

  // function Button (html) {
  //
  //   this.dom = html;
  //
  //
  // }

  function begin () {

    var things = document.querySelectorAll(".ContentCard");
    var next = document.querySelector(".next");
    var back = document.querySelector(".back");
    var submit = document.querySelector(".NavButton");
    var position = 0;

    for (var i = 0; i < things.length; i++) {
      var thing = new Page(things[i]);
      thing.setName(i);
    }

    function update () {

      for(var i = 0; i < things.length; i++) {
        var thing = new Page(things[i]);
        thing.isActive(i, position);
        thing.setClasses(i, position);
      }

      if (position < (things.length - 1)) {
        displaySubmit(false);
      }

      setButtonDisplay();
    }

    function displaySubmit(val) {
      if (val) {
        submit.className = "NavButton";
      }
      else {
        submit.className = "NavButton dontShowMe";
      }
    }

    function setButtonDisplay () {
      var submitClass = submit.className;

      if (submitClass == 'NavButton') {
        next.className = 'next dontShowMe';
      }
      else if (position === 0) {
        back.className = 'back dontShowMe';
      }
      else if (submitClass != 'NavButton') {
        next.className = 'next';
        back.className = 'back';
      }

    }

    function listening () {

      next.addEventListener("click", function (evt) {
        evt.preventDefault();
        console.log(position);

        if (position < (things.length - 1)) {
          position++;
          update();
        }
        else if (position == (things.length - 1)) {
          displaySubmit(true);
          setButtonDisplay();
        }

      });

      back.addEventListener("click", function (evt) {
        evt.preventDefault();

        if (position > 0) {
          position--;
          update();

          if (position < (things.length - 1)) {
            displaySubmit(false);
          }

        }

      });

    }

    update();
    listening();

  }

})()
