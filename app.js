document.addEventListener('DOMContentLoaded', function(){
    let next = document.querySelector('.next');
    let prev = document.querySelector('.prev');
    let slide = document.querySelector(".slide");
    
    next.addEventListener('click', function(){
        let items = document.querySelectorAll('.item');
        
        // Add a class to trigger the animation
        slide.classList.add('slide-left');
        
        // Wait for the animation to complete before moving the DOM element
        setTimeout(function() {
            slide.appendChild(items[0]);
            
            // Reset animation class
            slide.classList.remove('slide-left');
            
            // Update active slide content
            updateActiveSlide();
        }, 500); // Match this timing with your CSS transition duration
    });
    
    prev.addEventListener('click', function(){
        let items = document.querySelectorAll('.item');
        
        // For previous button, we need to move the last item to the front first
        slide.prepend(items[items.length - 1]);
        
        // Force a reflow to apply the prepend before transitioning
        slide.offsetWidth;
        
        // Add animation class
        slide.classList.add('slide-right');
        
        // Wait for animation to complete
        setTimeout(function() {
            slide.classList.remove('slide-right');
            updateActiveSlide();
        }, 500);
    });
    
    // Function to update which slide has active content
    function updateActiveSlide() {
        // Hide all content first
        document.querySelectorAll('.item .content').forEach(content => {
            content.style.display = 'none';
        });
        
        // Show content only on the second item (active slide)
        let activeContent = document.querySelectorAll('.item')[1].querySelector('.content');
        activeContent.style.display = 'block';
        
        // Reset and restart animations
        let nameElement = activeContent.querySelector('.name');
        let desElement = activeContent.querySelector('.des');
        let buttonElement = activeContent.querySelector('button');
        
        // Reset animations by removing and re-adding them
        nameElement.style.animation = 'none';
        desElement.style.animation = 'none';
        buttonElement.style.animation = 'none';
        
        // Force reflow
        nameElement.offsetHeight;
        
        // Re-add animations
        nameElement.style.animation = 'animate 1s ease-in-out forwards';
        desElement.style.animation = 'animate 1s 0.3s ease-in-out forwards';
        buttonElement.style.animation = 'animate 1s 0.6s ease-in-out forwards';
    }
    
    // Initialize the active slide on page load
    updateActiveSlide();
});