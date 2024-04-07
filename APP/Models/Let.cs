using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace APP.Models
{
    /// <summary>
    /// Ovo mi je POCO koji je mapiran na bazu
    /// </summary>
    public class Let: Entitet

    {
        /// <summary>
        /// Ovo mi je vrijeme polijetanja 
        /// </summary>
        [Required(ErrorMessage = "Obavezno unesite vrijeme.")]
        public DateTime VrijemePolijetanja { get; set; }

        /// <summary>
        /// Ovo mi je vrijeme slijetanja
        /// </summary>
        [Required(ErrorMessage = "Obavezno unesite vrijeme.")]
        public DateTime VrijemeSlijetanja  { get; set; }

        /// <summary>
        /// Ovo mi je prelet km
        /// </summary>
        [Range(0, 2000, ErrorMessage = "Vrijednost preleta mora biti između 0 i 2000.")]
        public decimal? PreletKm { get; set; }

        /// <summary>
        /// Šifra pilota
        /// </summary>
        [Required(ErrorMessage = "Obavezno unesite pilota.")]
        public int Pilot  { get; set; }

        /// <summary>
        /// Šifra zrakoplova
        /// </summary>
        [Required(ErrorMessage = "Obavezno unesite zrakoplov.")]
        public int Zrakoplov { get; set; }

        /// <summary>
        /// Lazy loadana instanca pilota
        /// </summary>
        [ForeignKey(nameof(Pilot))]
        public virtual Pilot? PilotInstanca { get; set; }

        /// <summary>
        /// Lazy loadana instanca pilota
        /// </summary>
        [ForeignKey(nameof(Zrakoplov))]
        public virtual Zrakoplov? ZrakoplovInstanca { get; set; }

    }
}
