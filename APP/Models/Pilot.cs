using System.ComponentModel.DataAnnotations;

namespace APP.Models
{
    /// <summary>
    /// Ovo mi je POCO koji je mapiran na bazu
    /// </summary>
    public class Pilot: Entitet

    {
        /// <summary>
        /// Ovo mi je ime pilota
        /// </summary>
        [Required]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Unos mora sadržavati minimalno 3 a maksimalno 50 znakova.")]
        public required string Ime { get; set; }

        /// <summary>
        /// Ovo mi je prezime pilota
        /// </summary>
        [Required]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Unos mora sadržavati minimalno 3 a maksimalno 50 znakova.")]
        public required string Prezime  { get; set; }

        /// <summary>
        /// Ovo mi je BrojDozvole
        /// </summary>
        [Required]
        [StringLength(15, MinimumLength = 3, ErrorMessage = "Unos mora sadržavati minimalno 3 a maksimalno 15 znakova.")]
        public required string BrojDozvole { get; set; }
    }
}
