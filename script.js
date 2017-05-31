(function() {

  function Section (html) {

    this.dom = html;

    this.populateAttributes = function (width) {
      this.dom.setAttribute("sectionWidth", width);
      console.dir(this.dom);
    }

    this.resetAttribute = function () {
      this.dom.removeAttribute("sectionWidth");
    }

    this.setPosition = function (index, current) {

      if (index == current) {
        console.dir(this.dom);
        var leftPx = -(this.dom.attributes.sectionWidth.value) + 'px';
        return leftPx;
      }

    }

  }

  var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
             requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

  throttle("resize", "optimizedResize");

  function begin() {
    var things = document.querySelectorAll(".thing");
    var next = document.querySelector(".next");
    var back = document.querySelector(".back");
    var carousel = document.querySelector(".carousel");
    var container = document.querySelector(".container");
    var counter = 0;
    var width = 0;

    function buildWidth () {
        thing.populateAttributes(width);
        var containerWidth = container.clientWidth;
        width += containerWidth;
    }

    function resetSectionWidth () {
      thing.resetAttribute();
    }

    function setCarouselWidth () {
      carousel.style.width = width + 'px';
    }

    for (var i = 0; i < things.length; i++) {
      var thing = new Section(things[i]);
      buildWidth();
    }

    function update() {
      var left;
      for (var i = 0; i < things.length; i++) {
        var thing = new Section(things[i]);
        var position = thing.setPosition(i, counter);
        if (position !== undefined) {
          left = position;
        }
      }
      carousel.style.left = left;
    }

    setCarouselWidth();
    update();
    
    next.addEventListener("click", function () {
      if (counter < (things.length - 1)) {
        counter++;
      }
      update();
    });

    back.addEventListener("click", function() {

      if (counter > 0) {
        counter--;
      }
      update();
    });

    window.addEventListener("optimizedResize", function() {
      width = 0;
      for (var i = 0; i < things.length; i++) {
        var thing = new Section(things[i]);
        resetSectionWidth();
        buildWidth();
      }
      setCarouselWidth();
      update();
    });

  }

  begin();

})()


//WILL NEED BOTH INDEX POSITIONS AS WELL AS ACTIVE ATTRIBUTE; INSTEAD OF USINg 1,2,3 ETC FOR INDEX POSITIONS WILL MAKE THE ATTRIBUTE ACTUALLY THE LEFT POSITIONING INSIDE THE CAROUSEL DIV.
//DEPENDING THEN ON WHICH IS ACTIVE, WILL SET CAROUSEL LEFT STYLE ATTRIBUTE TO THE INDEX ALIGNMENT OBTAINED FROM ACTIVE THING/CONTENT CARD.
//OPTIMIZATIONS FOR
