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
        [Required, MaxLength(50)]
        public required string Ime { get; set; }

        /// <summary>
        /// Ovo mi je prezime pilota
        /// </summary>
        [Required, MaxLength(50)]
        public required string Prezime  { get; set; }

        /// <summary>
        /// Ovo mi je BrojDozvole
        /// </summary>
        [Required, MaxLength(15)]
        public required string BrojDozvole { get; set; }
    }
}
