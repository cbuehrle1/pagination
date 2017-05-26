(function() {

  function Section (html) {

    this.dom = html;

    this.populateAttributes = function (index) {
      this.dom.setAttribute("sectionIndex", index);
    }

    this.getWidth = function () {
      var result = this.dom.offsetWidth;
      return result;
    }

    this.showHide = function (index, current) {

      if (index == current) {
        this.dom.setAttribute("show", true);
      }
      else {
        this.dom.setAttribute("show", false);
      }

    }

    this.setDisplay = function () {

      var toShow = this.dom.attributes.show.value;

      if (toShow === 'true') {
        // this.dom.style.display = "block";
        console.log('move thing');
      }
      else {
        // this.dom.style.display = "none";
        console.log('dont move thing');
      }
    }

  }

  function begin() {
    var things = document.querySelectorAll(".thing");
    var next = document.querySelector(".next");
    var back = document.querySelector(".back");
    var carousel = document.querySelector(".carousel");
    var counter = 0;
    var width = 0;

    function buildWidth () {
      var output = thing.getWidth();
      width += output;
    }

    function setCarouselWidth () {
      carousel.style.width = width + 'px';
    }

    for (var i = 0; i < things.length; i++) {
      var thing = new Section(things[i]);
      thing.populateAttributes(i);
      buildWidth();
      thing.showHide(i, counter);
      thing.setDisplay();
      console.dir(thing);
    }

    console.dir(carousel);
    console.log(width);
    function update() {
      for (var i = 0; i < things.length; i++) {
        var thing = new Section(things[i]);
        thing.showHide(i, counter);
        thing.setDisplay();
      }
    }

    setCarouselWidth();

    next.addEventListener("click", function () {
      if (counter < 2) {
        counter++;
        console.log(counter);
      }
      carousel.style.left =  -(width / 3) + 'px';
      update();
    });

    back.addEventListener("click", function() {

      if (counter > 0) {
        counter--;
        console.log(counter);
      }
      update();
    });

  }

  begin();

})()


//WILL NEED BOTH INDEX POSITIONS AS WELL AS ACTIVE ATTRIBUTE; INSTEAD OF USINg 1,2,3 ETC FOR INDEX POSITIONS WILL MAKE THE ATTRIBUTE ACTUALLY THE LEFT POSITIONING INSIDE THE CAROUSEL DIV.
//DEPENDING THEN ON WHICH IS ACTIVE, WILL SET CAROUSEL LEFT STYLE ATTRIBUTE TO THE INDEX ALIGNMENT OBTAINED FROM ACTIVE THING/CONTENT CARD.
//OPTIMIZATIONS FOR
