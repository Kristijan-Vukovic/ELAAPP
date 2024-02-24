using APP.Models;

namespace APP.Models
{/// <summary>
/// Ovo mi je POCO koji je mapiran na bazu
/// </summary>
    public class Zrakoplov: Entitet
    {
    /// <summary>
    /// Ovdje je tip zrakoplova na kojem se leti
    /// </summary>
        public string? TipZrakoplova { get; set; }

        /// <summary>
        /// ovo je registracija zrakoplova na kojem se lati
        /// </summary>
        public string? Registracija { get; set; }


    }
}
