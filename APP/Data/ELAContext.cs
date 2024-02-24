using APP.Models;
using Microsoft.EntityFrameworkCore;

namespace APP.Data
{
    /// <summary>
    /// Ovo mi je datoteka gdje ću navoditi datasetove i načine spajanja u bazi
    /// </summary>
    public class ELAContext:DbContext
    {
        /// <summary>
        /// Konstruktor
        /// </summary>
        /// <param name="options"></param>
        public ELAContext(DbContextOptions<ELAContext> options) : base(options) 
        
        { 


        }
        /// <summary>
        /// Piloti u bazi
        /// </summary>
        public DbSet<Pilot> Piloti { get; set; }

        /// <summary>
        /// Zrakoplovi u bazi
        /// </summary>
        public DbSet<Zrakoplov> Zrakoplovi { get; set; }
        
 




    }
}
