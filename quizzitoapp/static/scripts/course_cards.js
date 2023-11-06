
{
    const courseHiddenCover = document.getElementsByClassName('tile_content');
    const courseHiddenBottom = document.getElementsByClassName('hidden_content');
    const courseButton = document.getElementsByClassName('tile-btn');
    var hoveredCardIndex = 'None', eventType = '';

    for (let i=0; i<courseHiddenCover.length; i++) {
        (function(index) {

            courseButton[index].addEventListener('click', function() {
                // console.log('button has been clicked....');
            })


            courseHiddenCover[index].addEventListener('click', function(e) {
                if (e.type == 'click') {
                    if (!eventType) {
                        hovered = courseHiddenCover[index].style.top == '' ? false: true;
                        courseHiddenBottom[index].style.backgroundColor = hovered ? 'unset': 'rgba(255, 255, 255, 0.705)';
                        courseHiddenBottom[index].style.color = hovered ? 'unset': 'black';
                        courseHiddenBottom[index].style.backdropFilter = hovered ? 'unset': 'blur(5px)';
                        courseHiddenCover[index].style.top = hovered ? '': '-47%';

                        if (hoveredCardIndex != 'None' && hoveredCardIndex != index) {
                            courseHiddenBottom[hoveredCardIndex].style.backgroundColor = 'unset';
                            courseHiddenBottom[hoveredCardIndex].style.color = 'unset';
                            courseHiddenBottom[hoveredCardIndex].style.backdropFilter = 'unset';
                            courseHiddenCover[hoveredCardIndex].style.top = '';
                        };

                        hoveredCardIndex = index;
                    }
                }
            });


            courseHiddenCover[index].addEventListener('mouseover', function(e) {
                if (e.type == 'mouseover') {
                    courseHiddenBottom[index].style.backgroundColor = 'rgba(255, 255, 255, 0.705)';
                    courseHiddenBottom[index].style.color = 'black';
                    courseHiddenBottom[index].style.backdropFilter = 'blur(5px)';
                    courseHiddenCover[index].style.top = '-47%';
                    eventType = 'mouseover'
                }
            });


            courseHiddenCover[index].addEventListener('mouseleave', function(e) {
                if (e.type == 'mouseleave') {
                    courseHiddenBottom[index].style.backgroundColor = 'unset';
                    courseHiddenBottom[index].style.color = 'unset';
                    courseHiddenBottom[index].style.backdropFilter = 'unset';
                    courseHiddenCover[index].style.top = '';
                    eventType = ''
                }
            });
        })(i);
    }
    setInterval(()=>{
        let randomIndex = Math.floor(Math.random() * 100) % courseHiddenBottom.length;
        // console.log(randomIndex, courseHiddenBottom);
        courseHiddenBottom[randomIndex].style.backgroundColor = 'rgba(255, 255, 255, 0.705)';
        courseHiddenBottom[randomIndex].style.color = 'black';
        courseHiddenBottom[randomIndex].style.backdropFilter = 'blur(5px)';
        courseHiddenCover[randomIndex].style.top = '-47%';
        setTimeout(()=>{
            courseHiddenBottom[randomIndex].style.backgroundColor = 'unset';
            courseHiddenBottom[randomIndex].style.color = 'unset';
            courseHiddenBottom[randomIndex].style.backdropFilter = 'unset';
            courseHiddenCover[randomIndex].style.top = '';
        }, 2500)
    }, 1000);
}