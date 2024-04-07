using System.ComponentModel.DataAnnotations;

namespace APP.Models
{/// <summary>
/// Ovo mi je POCO koji je mapiran na bazu
/// </summary>
    public class Zrakoplov: Entitet
    {
        /// <summary>
        /// Ovdje je tip zrakoplova na kojem se leti
        /// </summary>
        [Required]
        [StringLength(50, MinimumLength = 1, ErrorMessage = "Unos mora sadržavati minimalno 1 a maksimalno 50 znakova.")]
        public required string TipZrakoplova { get; set; }

        /// <summary>
        /// ovo je registracija zrakoplova na kojem se lati
        /// </summary>
        [Required]
        [StringLength(15, MinimumLength = 3, ErrorMessage = "Unos mora sadržavati minimalno 3 a maksimalno 15 znakova.")]
        public required string Registracija { get; set; }


    }
}
