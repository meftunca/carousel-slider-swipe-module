    touch (".carousel-content", {
        start: (e, helper) => {
            clicked = true;
        }, move: (e, helper) => {
            let width = this.innerWidth,
                parents = e.target.parentNode,
                indis = parents.querySelector (".slide-item.active").tabIndex,
                next = -( helper.change.x ) + ( width * indis );
            parents.style.cursor = "pointer";
            parents.style.transitionDuration = "100ms";
            parents.style.transform = "translateX(-" + ( next ) + "px)";
        }, end: (e, helper) => {
            let direction = helper.direction.x,
                parents = helper.trigger,
                len = parents.querySelectorAll (".slide-item").length,
                width = Number (e.target.style.width.replace ("px", "")),
                indis = parents.querySelector (".slide-item.active").tabIndex + 1,
                next = () => {
                    let action = -1 * width * indis,
                        query = parents.lastElementChild.classList.contains ("active"),
                        query2 = helper.finish.x < width / 2,
                        query3 = Math.abs (helper.change.x) > width / 2;
                    if (query) {
                        action = 0;
                        parents.lastElementChild.classList.remove ("active");
                        parents.firstElementChild.classList.add ("active");
                        parents.style.transform = "translateX(" + ( action ) + "px)";
                    } else {
                        if (query2 || query3) {
                            let active = parents.querySelector (".slide-item.active");
                            parents.style.transform = "translateX(" + ( action ) + "px)";
                            active.classList.remove ("active");
                            active.nextElementSibling.classList.add ("active");
                        } else {
                            parents.style.transform = "translateX(" + ( action + width ) + "px)";
                        }
                    }
                },
                prev = () => {
                    let action = -width * ( indis - 1 ),
                        query = parents.firstElementChild.classList.contains ("active"),
                        query2 = helper.change.x > width / 2,
                        query3 = Math.abs (helper.change.x) < width / 2;
                    if (helper.change.x !== null || Math.abs (helper.change.x) > 50) {
                        if (query) {
                            action = -width * ( len - 1 );
                            parents.firstElementChild.classList.remove ("active");
                            parents.lastElementChild.classList.add ("active");
                            parents.style.transform = "translateX(" + ( action ) + "px)";
                        } else {
                            if (query2 || query3 && Math.abs (helper.change.x) > 75) {
                                let active = parents.querySelector (".slide-item.active");
                                action = -width * ( indis - 1 );
                                active.classList.remove ("active");
                                active.previousElementSibling.classList.add ("active");
                                parents.style.transform = "translateX(" + ( action + width ) + "px)";
                            }
                        }
                    }
                };
            parents.style.transitionDuration = "300ms";
            if (direction === "left") {
                next ();
            } else if (direction === "right") {
                prev ();
            }
        }
    });
