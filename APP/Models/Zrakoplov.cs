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
        [Required, MaxLength(50)]
        public required string TipZrakoplova { get; set; }

        /// <summary>
        /// ovo je registracija zrakoplova na kojem se lati
        /// </summary>
        [Required, MaxLength(15)]
        public required string Registracija { get; set; }


    }
}
