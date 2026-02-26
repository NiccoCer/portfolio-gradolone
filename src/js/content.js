export const content = {
    hero: {
        title: "FRANCESCO GRADOLONE",
        subtitle: "Portfolio",
        images: [
            "/images/5.jpeg",
            "/images/render1.jpg",
            "/images/6.png",
            "/images/render2.png"
        ]
    },
    about: {
        title: "CHI SONO",
        image: "/images/GRADO.jpg",
        description: "Sono un renderista architettonico di Mendicino (CS), classe 2003. Studio Ingegneria Edile-Architettura presso l’Università della Calabria. Mi occupo di visualizzazione architettonica, realizzando render per progetti accademici e lavori su commissione. In questo portfolio sono raccolti alcuni dei miei lavori.",
        email: "gradolonef@gmail.com",
        phone: "+39 351 810 5419"
    },
    gallery: [
        {
            title: "Stanza confortevole",
            category: "Interior Design",
            image: "/images/render1.jpg" //riutilizzata in header
        },
        {
            title: "Villa nel Bosco",
            category: "Exterior",
            image: "/images/5.jpeg"
        },
        {
            title: "Soggiorno luminoso",
            category: "Interior Design",
            image: "/images/6.png"
        },
        {
            title: "Palestra luminosa",
            category: "Concept",
            image: "/images/render2.png"
        },


    ],
    footer: {
        text: "© 2026 Francesco Gradolone. All rights reserved."
    },
    nav: [
        { label: "Home", link: "#hero" },
        { label: "Chi Sono", link: "#about" },
        { label: "Progetti", link: "#gallery" },
        { label: "Contatti", link: "#contact" }
    ]
}
