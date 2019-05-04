var gComputerNames = [ "Altair", "PET", "TRS-80", "Apple II", "Atari", "PC", "C64", "Macintosh", "Atari ST", "Amiga", "NeXT", "Phones", "Tablets", ];
var gYears = [ 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, ];
var gData = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
    [ 5000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
    [ 6000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
    [ 10000, 4000, 100000, 600, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
    [ 4000, 30000, 150000, 7600, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
    [ 0, 45000, 200000, 35000, 100000, 0, 0, 0, 0, 0, 0, 0, 0, ],
    [ 0, 90000, 290000, 78000, 200000, 0, 0, 0, 0, 0, 0, 0, 0, ],
    [ 0, 40000, 250000, 210000, 300000, 35000, 0, 0, 0, 0, 0, 0, 0, ],
    [ 0, 10000, 300000, 279000, 600000, 240000, 200000, 0, 0, 0, 0, 0, 0, ],
    [ 0, 0, 200000, 420000, 500000, 1300000, 2000000, 0, 0, 0, 0, 0, 0, ],
    [ 0, 0, 50000, 1000000, 200000, 2000000, 2500000, 372000, 0, 0, 0, 0, 0, ],
    [ 0, 0, 10000, 900000, 100000, 3700000, 2500000, 200000, 100000, 100000, 0, 0, 0, ],
    [ 0, 0, 0, 700000, 0, 5020000, 2500000, 380000, 200000, 200000, 0, 0, 0, ],
    [ 0, 0, 0, 500000, 0, 5950000, 1500000, 550000, 400000, 300000, 0, 0, 0, ],
    [ 0, 0, 0, 200000, 0, 11900000, 1250000, 900000, 350000, 400000, 12000, 0, 0, ],
    [ 0, 0, 0, 200000, 0, 17550000, 1250000, 1100000, 300000, 600000, 12000, 0, 0, ],
    [ 0, 0, 0, 100000, 0, 16838000, 700000, 1300000, 300000, 750000, 12000, 0, 0, ],
    [ 0, 0, 0, 100000, 0, 14399000, 800000, 2100000, 300000, 1035000, 16000, 0, 0, ],
    [ 0, 0, 0, 100000, 0, 18300000, 300000, 2500000, 120000, 390000, 10000, 0, 0, ],
    [ 0, 0, 0, 30000, 0, 27750000, 175000, 3300000, 30000, 155000, 5000, 0, 0, ],
    [ 0, 0, 0, 0, 0, 37200000, 0, 3800000, 0, 50000, 0, 0, 0, ],
    [ 0, 0, 0, 0, 0, 45880000, 0, 4120000, 0, 42000, 0, 0, 0, ],
    [ 0, 0, 0, 0, 0, 74612000, 0, 3388000, 0, 0, 0, 0, 0, ],
    [ 0, 0, 0, 0, 0, 78414000, 0, 2586000, 0, 0, 0, 0, 0, ],
    [ 0, 0, 0, 0, 0, 96928000, 0, 3072000, 0, 0, 0, 0, 0, ],
    [ 0, 0, 0, 0, 0, 116119000, 0, 3881000, 0, 0, 0, 0, 0, ],
    [ 0, 0, 0, 0, 0, 134160000, 0, 3840000, 0, 0, 0, 300000, 0, ],
    [ 0, 0, 0, 0, 0, 124826000, 0, 3174000, 0, 0, 0, 3000000, 0, ],
    [ 0, 0, 0, 0, 0, 128902000, 0, 3098000, 0, 0, 0, 4230000, 0, ],
    [ 0, 0, 0, 0, 0, 147702000, 0, 3098000, 0, 0, 0, 7400000, 0, ],
    [ 0, 0, 0, 0, 0, 173193000, 0, 3507000, 0, 0, 0, 15500000, 0, ],
    [ 0, 0, 0, 0, 0, 192233000, 0, 4742000, 0, 0, 0, 46600000, 0, ],
    [ 0, 0, 0, 0, 0, 239211000, 0, 0, 0, 0, 0, 80000000, 0, ],
    [ 0, 0, 0, 0, 0, 271180000, 0, 0, 0, 0, 0, 122300000, 0, ],
    [ 0, 0, 0, 0, 0, 297000000, 0, 0, 0, 0, 0, 139300000, 0, ],
    [ 0, 0, 0, 0, 0, 309122000, 0, 0, 0, 0, 0, 176700000, 0, ],
    [ 0, 0, 0, 0, 0, 352400000, 0, 0, 0, 0, 0, 304000000, 17610000, ],
    [ 0, 0, 0, 0, 0, 353441000, 0, 0, 0, 0, 0, 472000000, 60017000, ],
];