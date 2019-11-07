using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace header_navigation.Products
{
    public class Product
    {
        public int Id { get; set; }
        public string Code { get; set; }
        [Required]
        public string Name { get; set; }
    }
    internal static class Products
    {
        private static IList<Product> products;
        public static IEnumerable<Product> GetAll()
        {
            return products.OrderBy(p => p.Name);
        }

        public static void Add(Product product)
        {
            product.Id = products.Max(p => p.Id) + 1;
            product.Code = $"P{product.Id.ToString("0000")}";
            products.Add(product);
        }

        public static void Update(int id, Product product)
        {
            var prod = products.Single(p => p.Id == id);
            prod.Name = product.Name;
        }

        public static void Delete(int id)
        {
            var prod = products.Single(p => p.Id == id);
            products.Remove(prod);
        }
        public static void InitProducts()
        {
            products = pastas.Select((p, i) => new Product
            {
                Id = i+1,
                Name = p,
                Code = $"P{(i+1).ToString("0000")}"
            }).ToList();
        }

        private static string[] pastas = new string[]{
                    "AGNOLINI",
        "ANELLI LISCI",
        "ANELLI RIGATI",
        "ARMELLETTE",
        "AVEMARIE",
        "BALLERINE",
        "BARBINA",
        "BOCCOLOTTI",
        "BUCATINI",
        "CAMPANELLE"};
        //        private static string[] pastas = new string[]{
        //            "AGNOLINI",
        //"ANELLI LISCI",
        //"ANELLI RIGATI",
        //"ARMELLETTE",
        //"AVEMARIE",
        //"BALLERINE",
        //"BARBINA",
        //"BOCCOLOTTI",
        //"BUCATINI",
        //"CAMPANELLE",
        //"CANNELLONI",
        //"CANNERONI",
        //"MEZZI CANNERONI LISCI",
        //"CANNOLICCHI",
        //"CAPELLI D'ANGELO",
        //"CAPELLINI",
        //"CAPPELLETTI",
        //"CASERECCIA",
        //"CAVATAPPI",
        //"CELLENTANI",
        //"CHIFFERI",
        //"CHITARRA",
        //"CONCHIGLIE",
        //"CONCHIGLIETTE",
        //"CONCHIGLIONI",
        //"CRESTE",
        //"CRESTE DI GALLO",
        //"CUBETTI",
        //"DISCHI VOLANTI",
        //"ELICHE VERDI",
        //"ELICHE TRICOLORI",
        //"FAGOTTINI",
        //"FARFALLE",
        //"FARFALLINE",
        //"FARFALLE TONDE",
        //"FESTONATI",
        //"FETTUCCE",
        //"FETTUCCINE",
        //"FILINI",
        //"FUSILLI",
        //"GARGANELLI",
        //"GEMELLI",
        //"GENOVESINI RIGATI",
        //"GHIOTTOLE",
        //"GIGLI",
        //"GNOCCHETTI SARDI",
        //"GNOCCHI",
        //"GOMITI",
        //"LASAGNE",
        //"LASAGNE ONDULATE",
        //"LASAGNE VERDI",
        //"LINGUETTINE",
        //"LINGUINE",
        //"LUMACHE",
        //"LUMACONI GIGANTI",
        //"LUMACONI RIGATI",
        //"MACCHERONI",
        //"MACCHERONI RIGATI",
        //"MACCHERONCINI",
        //"MAFALDE",
        //"MEZZELUNE",
        //"MEZZEMANI",
        //"MILLERIGHE",
        //"MISTA",
        //"MEZZE PENNE RIGATE",
        //"NIDI DI CAPELLINI",
        //"NIDI DI FETTUCCINE",
        //"NIDI DI PAPPARDELLE",
        //"OCCHI DI PERNICE",
        //"ONDINE",
        //"ORECCHIETTE",
        //"ORECCHIETTE TRICOLORE",
        //"ORZO",
        //"PAGLIA E FIENO",
        //"PANZEROTTO",
        //"PAPPARDELLE",
        //"PENNE LISCE",
        //"PENNE A CANDELA",
        //"PENNONI RIGATI",
        //"PEPE BUCATO",
        //"PERCIATI",
        //"PERLINE",
        //"PIOMBI",
        //"QUADRUCCI",
        //"RACCHETTE",
        //"RADIATORI",
        //"RAVIOLI",
        //"RAVIOLONI",
        //"REGINA",
        //"RIGATONI",
        //"RISONE",
        //"ROCCHETTI",
        //"RUOTE",
        //"SEMI DI MELONE",
        //"SIGARETTE",
        //"SPAGHETTI",
        //"SPAGHETTINI",
        //"STELLETTE",
        //"STELLINE",
        //"STROZZAPRETI",
        //"TAGLIATELLE",
        //"TAGLIATELLE SPIANATE",
        //"TAGLIOLINE",
        //"TAGLIATELLE ZIGRINATE",
        //"TEMPESTINA",
        //"TOFE TRICOLORE",
        //"TORTELLINO",
        //"TORTIGLIONE",
        //"TORTIGLIONI",
        //"TRIPOLINE",
        //"TROTTOLE",
        //"TRUCCIOLO",
        //"TUBETTI",
        //"TUFOLI",
        //"VERMICELLI",
        //"ZITELLINI",
        //"ZITI",
        //"ZITI TAGLIATI",
        //"ZITONI"
        //        };
    }
}
