// Questo file contiene tutto il contenuto del sito.
// Modifica semplicemente i testi tra virgolette per aggiornare il sito.

export const content = {
    hero: {
        title: "FRANCESCO GRADOLONE",
        subtitle: "Portfolio",
        image: "/images/hero.png"
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
            title: "Villa nel Bosco",
            category: "Interior Design",
            image: "/images/gallery1.png"
        },
        {
            title: "Residenza Tramonto",
            category: "Exterior",
            image: "/images/gallery2.png"
        },
        {
            title: "Dettagli Materici",
            category: "Photography",
            image: "/images/gallery3.png"
        },
        {
            title: "Museo del Cemento",
            category: "Concept",
            image: "/images/hero.png" // Riutilizzo placeholder
        }
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
