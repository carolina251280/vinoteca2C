function imageCarousel(array){

    var experiencia = "";
    
    for (i = 0; i < array.length; i++) {
      experiencia +=  `   
        <li class="p-2"><img src="${array[i].experiencias}" alt="${array[i].name}"></li>
        <li class="p-2"><img src="${array[i].fotosUvas}" alt="${array[i].name}"></li>          
          `;
    }
    document.getElementById("experiencias").innerHTML = experiencia;
    
    const root = document.documentElement;
    const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue(
      "--marquee-elements-displayed"
    );
    
    
    const marqueeContent = document.querySelector("ul.marquee-content");
    
    root.style.setProperty("--marquee-elements", marqueeContent.children.length);
    
    
    }


