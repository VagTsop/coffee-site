/**
 * Δίγλωσσο περιεχόμενο. Το HTML γράφεται στα **αγγλικά** (προεπιλογή)· εδώ
 * ζουν και οι δύο εκδοχές, ώστε η εναλλαγή να δουλεύει προς τις δύο κατευθύνσεις.
 *
 * Κάθε κλειδί αντιστοιχεί σε ένα `data-i18n` του index.html.
 */
export const DEFAULT_LANG = 'en'
export const LANGS = ['en', 'el']
export const STORAGE_KEY = 'andante:lang'

export const TEXT = {
  en: {
    /* --- meta --- */
    'meta.title': 'Caffè Andante — café & bar in the backstreets of Thessaloniki',
    'meta.description':
      'Caffè Andante. An old drawing room in the backstreets of Thessaloniki: coffee, all-day brunch, pastries, cocktails and music on vinyl. From 8 in the morning until late.',

    /* --- nav --- */
    'nav.about': 'The place',
    'nav.menu': 'Menu',
    'nav.space': 'The space',
    'nav.programme': 'What’s on',
    'nav.visit': 'Find us',
    'nav.book': 'Book a table',
    'nav.skip': 'Skip to content',
    'nav.menuToggle': 'Navigation menu',
    'nav.home': 'Caffè Andante — back to top',
    'nav.lang': 'Language',

    /* --- status --- */
    'status.open': 'Open now',
    'status.closed': 'Closed now',
    'status.openLong': 'We are open right now — we close at {time}.',
    'status.closedLong': 'We are closed right now — we open at {time}.',
    'status.untilTonight': 'until {time} tonight',
    'status.opensAt': 'we open at {time}',
    'status.openSeven': 'open seven days a week',
    'status.today': 'today',
    'clock.open': 'open',
    'clock.closed': 'closed',

    /* --- hero --- */
    'hero.eyebrow': 'Café & bar · 47 Olympou',
    'hero.tagline': 'Time walks here.',
    'hero.lead':
      'An old drawing room in the backstreets of Thessaloniki: mosaic floors, Thonet chairs, vinyl playing from the morning, and a wall of clocks that never agree with one another.',
    'hero.ctaBook': 'Book a table',
    'hero.ctaMenu': 'See the menu',
    'hero.metaReviews': 'from 512 guest reviews',
    'hero.metaPedestrian': 'Pedestrian street',
    'hero.metaPedestrianSub': 'tables outside & two floors',
    'hero.scroll': 'Continue below',
    'hero.alt':
      'Tables in the alley outside Caffè Andante, with the windows lit up at night',

    /* --- marquee --- */
    'marquee':
      'Specialty espresso ✻ All-day brunch ✻ Homemade pastries ✻ Cocktails & natural wine ✻ Vinyl every night ✻ Tables on the pedestrian street ✻ Dog friendly ✻',

    /* --- story --- */
    'story.eyebrow': 'The place',
    'story.title': 'No clock in here shows the same time',
    'story.p1':
      'Andante was not designed; it was collected. An interwar apartment with its original mosaic on the floor, Thonet chairs, marble tables and cabinets holding glassware, clocks and the record collection of the house.',
    'story.p2':
      'In the mornings the sun comes through the stained glass and the pedestrian street fills with cups. At night the lights go down, the turntable takes over and coffee turns into negroni. Same room — three completely different hours of the day.',
    'story.stat1': 'average rating',
    'story.stat2': 'guest reviews',
    'story.stat3': 'floors of seating',
    'story.stat4': 'days a week',
    'story.alt1': 'The interior seen from the window one evening',
    'story.alt2': 'The ground-floor room with Thonet chairs and framed prints',

    /* --- menu --- */
    'menu.eyebrow': 'The list',
    'menu.title': 'From the first espresso to the last drink',
    'menu.lead':
      'Specialty coffee, brunch served all day, pastries of the hour and a bar that runs until late.',
    'menu.tabs': 'Menu categories',
    'menu.tab.coffee': 'Coffee & drinks',
    'menu.tab.brunch': 'Brunch & plates',
    'menu.tab.sweets': 'Pastries',
    'menu.tab.bar': 'Drinks & cocktails',
    'menu.note':
      'Indicative menu. Available options and prices are confirmed in the shop.',
    'menu.cap.coffee': 'One blend, two single origins — they change every month.',
    'menu.cap.brunch': 'Brunch is served all day — including Sundays at six.',
    'menu.cap.sweets': 'Whatever was made this morning — until it runs out.',
    'menu.cap.bar': 'The bar opens at six. The turntable, at nine.',
    'menu.alt.coffee': 'Espresso in a green-rimmed cup on a marble table',
    'menu.alt.brunch': 'A slice of sourdough with fruit, honey and micro greens',
    'menu.alt.sweets': 'A dessert plate with strawberries and macarons beside a cup of coffee',
    'menu.alt.bar': 'A negroni on a marble counter',

    'm.espresso': 'Espresso',
    'm.doppio': 'Espresso doppio',
    'm.cappuccino': 'Cappuccino',
    'm.freddoEspresso': 'Freddo espresso',
    'm.freddoCappuccino': 'Freddo cappuccino',
    'm.flatWhite': 'Flat white',
    'm.filter': 'Filter / V60 of the day',
    'm.greekCoffee': 'Greek coffee',
    'm.chocolate': 'Hot chocolate',
    'm.tea': 'Tea & infusions',
    'm.juice': 'Fresh juice',
    'm.lemonade': 'Homemade lemonade',

    'm.bruschetta': 'Bruschetta of the day',
    'm.bruschetta.sub': 'cheese, roasted pepper, rocket',
    'm.benedict': 'Eggs benedict',
    'm.benedict.sub': 'on sourdough',
    'm.avocado': 'Avocado toast',
    'm.avocado.sub': 'with a poached egg',
    'm.omelette': 'Omelette of the day',
    'm.pancakes': 'Pancakes with seasonal fruit',
    'm.yoghurt': 'Yoghurt with granola & honey',
    'm.salad': 'Seasonal salad',
    'm.salad.sub': 'vegetarian',
    'm.club': 'Club sandwich',
    'm.toastie': 'Toastie with turkey & graviera',
    'm.platter': 'Charcuterie & cheese platter',
    'm.soup': 'Soup of the day',
    'm.bread': 'Sourdough bread',
    'm.bread.sub': 'with butter & jam',

    'm.cheesecake': 'Lemon cheesecake',
    'm.chocolatePie': 'Chocolate pie',
    'm.walnutCake': 'Walnut cake with ice cream',
    'm.millefeuille': 'Mille-feuille',
    'm.orangePie': 'Orange filo pie',
    'm.profiterole': 'Profiterole',
    'm.tiramisu': 'Tiramisù',
    'm.banoffee': 'Banoffee',
    'm.mousse': 'Chocolate mousse',
    'm.iceCream': 'Ice cream per scoop',

    'm.negroni': 'Negroni',
    'm.espressoMartini': 'Espresso martini',
    'm.ginTonic': 'Gin & tonic',
    'm.aperol': 'Aperol spritz',
    'm.oldFashioned': 'Old fashioned',
    'm.margarita': 'Margarita',
    'm.draught': 'Draught beer',
    'm.wineGlass': 'Wine by the glass',
    'm.wineGlass.sub': 'natural, from small growers',
    'm.wineBottle': 'Wine by the bottle',
    'm.ouzo': 'Ouzo / tsipouro',
    'm.spirit': 'House spirit',
    'm.soft': 'Soft drinks & water',

    /* --- space --- */
    'space.eyebrow': 'The space',
    'space.title': 'Two floors, one collection, no hurry',
    'space.lead':
      'Downstairs the room with the mosaics and the cabinets. Upstairs the mezzanine with the marble corner that looks onto the street. Outside, the pedestrian street.',
    'space.tag1': 'The room',
    'space.tag2': 'The glass door',
    'space.tag3': 'The corner',
    'space.tag4': 'The street',
    'space.tag5': 'The window',
    'space.tag6': 'The chairs',
    'space.alt2': 'An old glass door with lace curtains and plants',
    'space.alt3': 'A striped banquette and wooden table in a corner of the room',
    'space.alt4': 'Bistro tables and chairs on the cobblestones',
    'space.alt5': 'A table by the window with a floor lamp, at night',
    'space.alt6': 'Thonet chairs in warm afternoon light',

    /* --- programme --- */
    'prog.eyebrow': 'Our week',
    'prog.title': 'What’s on, and when',
    'prog.lead':
      'No ticket and no booking for the music — only for a table, if you are a group.',
    'prog.tue': 'Tuesday',
    'prog.thu': 'Thursday',
    'prog.fri': 'Friday',
    'prog.sun': 'Sunday',
    'prog.vinyl': 'Vinyl night',
    'prog.vinyl.sub': 'Soul, bossa and whatever the record shelf turns up.',
    'prog.jazz': 'Live jazz trio',
    'prog.jazz.sub': 'Piano, double bass, drums. Two sets, no cover charge.',
    'prog.dj': 'DJ set — disco & funk',
    'prog.dj.sub': 'The bar runs until three.',
    'prog.brunch': 'All-day brunch',
    'prog.brunch.sub': 'Sourdough, eggs, and newspapers nobody picks up.',

    /* --- rating --- */
    'rating.aria': '4.8 out of 5 stars',
    'rating.count': 'from 512 guest reviews',
    'chip.outdoor': 'Tables outside',
    'chip.floors': 'Two floors',
    'chip.live': 'Live music',
    'chip.brunch': 'Brunch',
    'chip.veg': 'Vegetarian options',
    'chip.takeaway': 'Takeaway',
    'chip.dogs': 'Dog friendly',
    'chip.access': 'Accessible entrance',
    'chip.cards': 'Cards & contactless',
    'quote1':
      'I came in for one espresso and left three hours later. Blame the sofa by the window.',
    'quote2':
      'The best flat white in the centre, and the only kitchen that will serve you brunch at six in the afternoon without giving you a look.',
    'quote3':
      'I went for the jazz and stayed for the negroni. Nobody is in a hurry in here — not even the clocks on the wall.',
    'quote.nav1': 'Review 1',
    'quote.nav2': 'Review 2',
    'quote.nav3': 'Review 3',

    /* --- booking --- */
    'book.eyebrow': 'Booking',
    'book.title': 'Book a table in half a minute',
    'book.lead':
      'For groups of more than four and for the evenings with music, better to let us know in advance. We will call you to confirm.',
    'book.phone': 'Phone',
    'book.email': 'Email',
    'book.groups': 'Large groups',
    'book.groups.value': 'up to 20 on the mezzanine',
    'book.name': 'Name',
    'book.phoneField': 'Phone',
    'book.date': 'Date',
    'book.time': 'Time',
    'book.people': 'People',
    'book.people.more': '7 or more',
    'book.note': 'Note',
    'book.note.optional': '(optional)',
    'book.submit': 'Send request',
    'book.error': 'Please add a name, a valid phone number and a date.',
    'book.success': 'Thank you! We will call you on {phone} to confirm.',

    /* --- visit --- */
    'visit.eyebrow': 'Where & when',
    'visit.title': '47 Olympou, in the backstreets of the Upper Town',
    'visit.hours': 'Opening hours',
    'visit.contact': 'Contact',
    'visit.address': 'Address',
    'visit.addressValue': '47 Olympou<br />Thessaloniki 546 31',
    'visit.phone': 'Phone',
    'visit.service': 'Service',
    'visit.serviceValue': 'Dine-in & takeaway<br />(no delivery)',
    'visit.call': 'Call us',
    'visit.map': 'Map — the area around Olympou street, Thessaloniki',
    'day.1': 'Monday',
    'day.2': 'Tuesday',
    'day.3': 'Wednesday',
    'day.4': 'Thursday',
    'day.5': 'Friday',
    'day.6': 'Saturday',
    'day.0': 'Sunday',

    /* --- footer --- */
    'footer.blurb': 'Café & bar in the backstreets of Thessaloniki.<br />Time walks here.',
    'footer.nav': 'Footer navigation',
    'footer.demoLabel': 'Sample website.',
    'footer.demo':
      '“Caffè Andante” is a fictional business. The address, phone number, prices, reviews and programme are indicative and do not correspond to any real establishment. Photography: Unsplash.',
    'footer.credit': 'Design & build: your studio',
    'footer.copy': '© {year} Caffè Andante — demo',

    /* --- misc --- */
    'qb.call': 'Call',
    'qb.menu': 'Menu',
    'qb.book': 'Book',
    'a11y.toTop': 'Back to top',
    'a11y.close': 'Close',
  },

  el: {
    /* --- meta --- */
    'meta.title': 'Caffè Andante — Καφέ & μπαρ στα στενά της Θεσσαλονίκης',
    'meta.description':
      'Caffè Andante. Παλιό σαλόνι στα στενά της Θεσσαλονίκης: καφές, brunch όλη μέρα, γλυκά, κοκτέιλ και μουσική σε βινύλιο. Από τις 8 το πρωί μέχρι αργά.',

    /* --- nav --- */
    'nav.about': 'Το μαγαζί',
    'nav.menu': 'Μενού',
    'nav.space': 'Ο χώρος',
    'nav.programme': 'Πρόγραμμα',
    'nav.visit': 'Πού & πότε',
    'nav.book': 'Κράτηση',
    'nav.skip': 'Μετάβαση στο περιεχόμενο',
    'nav.menuToggle': 'Μενού πλοήγησης',
    'nav.home': 'Caffè Andante — αρχή σελίδας',
    'nav.lang': 'Γλώσσα',

    /* --- status --- */
    'status.open': 'Ανοιχτά τώρα',
    'status.closed': 'Κλειστά τώρα',
    'status.openLong': 'Αυτή τη στιγμή είμαστε ανοιχτά — κλείνουμε στις {time}.',
    'status.closedLong': 'Αυτή τη στιγμή είμαστε κλειστά — ανοίγουμε στις {time}.',
    'status.untilTonight': 'μέχρι τις {time} απόψε',
    'status.opensAt': 'ανοίγουμε στις {time}',
    'status.openSeven': 'ανοιχτά επτά μέρες',
    'status.today': 'σήμερα',
    'clock.open': 'ανοιχτά',
    'clock.closed': 'κλειστά',

    /* --- hero --- */
    'hero.eyebrow': 'Καφέ & μπαρ · Ολύμπου 47',
    'hero.tagline': 'Ο χρόνος εδώ περπατάει.',
    'hero.lead':
      'Ένα παλιό σαλόνι στα στενά της Θεσσαλονίκης: μωσαϊκά δάπεδα, καρέκλες Thonet, βινύλια που παίζουν από το πρωί και ένας τοίχος γεμάτος ρολόγια που δεν συμφωνούν ποτέ μεταξύ τους.',
    'hero.ctaBook': 'Κράτηση τραπεζιού',
    'hero.ctaMenu': 'Δες το μενού',
    'hero.metaReviews': 'από 512 κριτικές επισκεπτών',
    'hero.metaPedestrian': 'Πεζόδρομος',
    'hero.metaPedestrianSub': 'τραπεζάκια έξω & δύο όροφοι',
    'hero.scroll': 'Συνέχεια παρακάτω',
    'hero.alt':
      'Τραπεζάκια στο σοκάκι έξω από το Caffè Andante, με τα παράθυρα φωτισμένα το βράδυ',

    /* --- marquee --- */
    'marquee':
      'Specialty espresso ✻ Brunch όλη μέρα ✻ Χειροποίητα γλυκά ✻ Κοκτέιλ & φυσικά κρασιά ✻ Βινύλιο κάθε βράδυ ✻ Τραπεζάκια στον πεζόδρομο ✻ Dog friendly ✻',

    /* --- story --- */
    'story.eyebrow': 'Το μαγαζί',
    'story.title': 'Κανένα ρολόι εδώ μέσα δεν δείχνει την ίδια ώρα',
    'story.p1':
      'Το Andante δεν σχεδιάστηκε· μαζεύτηκε. Ένα διαμέρισμα του μεσοπολέμου με τα αρχικά του μωσαϊκά στο πάτωμα, καρέκλες Thonet, μαρμάρινα τραπεζάκια και βιτρίνες που φυλάνε γυαλικά, ρολόγια και τη δισκοθήκη του μαγαζιού.',
    'story.p2':
      'Τα πρωινά ο ήλιος μπαίνει από τα βιτρό και ο πεζόδρομος γεμίζει φλιτζάνια. Το βράδυ χαμηλώνουν τα φώτα, το πικάπ αναλαμβάνει και ο καφές γίνεται negroni. Ίδιος χώρος — τρεις εντελώς διαφορετικές ώρες της ημέρας.',
    'story.stat1': 'μέση βαθμολογία',
    'story.stat2': 'κριτικές επισκεπτών',
    'story.stat3': 'όροφοι καθιστικού',
    'story.stat4': 'μέρες ανοιχτά',
    'story.alt1': 'Το εσωτερικό του μαγαζιού όπως φαίνεται από τη βιτρίνα ένα βράδυ',
    'story.alt2': 'Το σαλόνι του ισογείου με καρέκλες Thonet και κορνίζες στον τοίχο',

    /* --- menu --- */
    'menu.eyebrow': 'Ο κατάλογος',
    'menu.title': 'Από τον πρώτο espresso ως το τελευταίο ποτό',
    'menu.lead':
      'Specialty καφές, brunch που σερβίρεται όλη μέρα, γλυκά της ώρας και ένα μπαρ που δουλεύει μέχρι αργά.',
    'menu.tabs': 'Κατηγορίες καταλόγου',
    'menu.tab.coffee': 'Καφές & ροφήματα',
    'menu.tab.brunch': 'Brunch & πιάτα',
    'menu.tab.sweets': 'Γλυκά',
    'menu.tab.bar': 'Ποτά & κοκτέιλ',
    'menu.note':
      'Ενδεικτικός κατάλογος. Οι διαθέσιμες επιλογές και οι τιμές ενημερώνονται στο κατάστημα.',
    'menu.cap.coffee': 'Ένα μείγμα, δύο μονοποικιλιακοί — αλλάζουν κάθε μήνα.',
    'menu.cap.brunch': 'Το brunch σερβίρεται όλη μέρα — και τις Κυριακές στις έξι.',
    'menu.cap.sweets': 'Ό,τι φτιάχτηκε το πρωί — μέχρι να τελειώσει.',
    'menu.cap.bar': 'Το μπαρ ανοίγει στις έξι. Το πικάπ, στις εννιά.',
    'menu.alt.coffee': 'Espresso σε φλιτζάνι με πράσινο χείλος πάνω σε μαρμάρινο τραπέζι',
    'menu.alt.brunch': 'Φέτα ψωμιού προζύμης με φρούτα, μέλι και φύτρες',
    'menu.alt.sweets': 'Πιάτο με γλυκό, φράουλες και μακαρόν δίπλα σε φλιτζάνι καφέ',
    'menu.alt.bar': 'Negroni σε ποτήρι πάνω σε μαρμάρινο πάγκο',

    'm.espresso': 'Espresso',
    'm.doppio': 'Espresso doppio',
    'm.cappuccino': 'Cappuccino',
    'm.freddoEspresso': 'Freddo espresso',
    'm.freddoCappuccino': 'Freddo cappuccino',
    'm.flatWhite': 'Flat white',
    'm.filter': 'Filter / V60 ημέρας',
    'm.greekCoffee': 'Ελληνικός',
    'm.chocolate': 'Σοκολάτα ζεστή',
    'm.tea': 'Τσάι & αφεψήματα',
    'm.juice': 'Χυμός φρέσκος',
    'm.lemonade': 'Λεμονάδα σπιτική',

    'm.bruschetta': 'Μπρουσκέτες ημέρας',
    'm.bruschetta.sub': 'τυρί, πιπεριά Φλωρίνης, ρόκα',
    'm.benedict': 'Αυγά benedict',
    'm.benedict.sub': 'σε ψωμί προζύμης',
    'm.avocado': 'Avocado toast',
    'm.avocado.sub': 'με αυγό ποσέ',
    'm.omelette': 'Ομελέτα ημέρας',
    'm.pancakes': 'Πάνκεϊκ με φρούτα εποχής',
    'm.yoghurt': 'Γιαούρτι με granola & μέλι',
    'm.salad': 'Σαλάτα εποχής',
    'm.salad.sub': 'χορτοφαγική',
    'm.club': 'Club sandwich',
    'm.toastie': 'Τοστ με γαλοπούλα & γραβιέρα',
    'm.platter': 'Πιατέλα αλλαντικών & τυριών',
    'm.soup': 'Σούπα ημέρας',
    'm.bread': 'Ζυμωτό ψωμί',
    'm.bread.sub': 'με βούτυρο & μαρμελάδα',

    'm.cheesecake': 'Cheesecake λεμόνι',
    'm.chocolatePie': 'Σοκολατόπιτα',
    'm.walnutCake': 'Καρυδόπιτα με παγωτό',
    'm.millefeuille': 'Μιλφέιγ',
    'm.orangePie': 'Πορτοκαλόπιτα',
    'm.profiterole': 'Προφιτερόλ',
    'm.tiramisu': 'Tiramisù',
    'm.banoffee': 'Μπανόφι',
    'm.mousse': 'Μους σοκολάτας',
    'm.iceCream': 'Παγωτό ανά μπάλα',

    'm.negroni': 'Negroni',
    'm.espressoMartini': 'Espresso martini',
    'm.ginTonic': 'Gin & tonic',
    'm.aperol': 'Aperol spritz',
    'm.oldFashioned': 'Old fashioned',
    'm.margarita': 'Margarita',
    'm.draught': 'Μπύρα βαρελίσια',
    'm.wineGlass': 'Κρασί ποτήρι',
    'm.wineGlass.sub': 'φυσικά, από μικρούς παραγωγούς',
    'm.wineBottle': 'Κρασί φιάλη',
    'm.ouzo': 'Ούζο / τσίπουρο',
    'm.spirit': 'Ποτό βάσης',
    'm.soft': 'Αναψυκτικά & νερό',

    /* --- space --- */
    'space.eyebrow': 'Ο χώρος',
    'space.title': 'Δύο όροφοι, μια συλλογή, καμία βιασύνη',
    'space.lead':
      'Κάτω το σαλόνι με τα μωσαϊκά και τις βιτρίνες. Πάνω το πατάρι με τη μαρμάρινη γωνιά που βλέπει τον δρόμο. Έξω, ο πεζόδρομος.',
    'space.tag1': 'Το σαλόνι',
    'space.tag2': 'Η τζαμόπορτα',
    'space.tag3': 'Η γωνιά',
    'space.tag4': 'Ο πεζόδρομος',
    'space.tag5': 'Το παράθυρο',
    'space.tag6': 'Οι καρέκλες',
    'space.alt2': 'Παλιά τζαμόπορτα με δαντελένιες κουρτίνες και φυτά',
    'space.alt3': 'Ριγέ καναπές και ξύλινο τραπεζάκι σε γωνιά του μαγαζιού',
    'space.alt4': 'Τραπεζάκια και καρέκλες bistro στο καλντερίμι',
    'space.alt5': 'Τραπέζι δίπλα στο παράθυρο με φωτιστικό δαπέδου, το βράδυ',
    'space.alt6': 'Καρέκλες Thonet σε ζεστό απογευματινό φως',

    /* --- programme --- */
    'prog.eyebrow': 'Η εβδομάδα μας',
    'prog.title': 'Τι παίζει, και πότε',
    'prog.lead':
      'Χωρίς εισιτήριο και χωρίς κράτηση για τη μουσική — μόνο για τραπέζι, αν είστε παρέα.',
    'prog.tue': 'Τρίτη',
    'prog.thu': 'Πέμπτη',
    'prog.fri': 'Παρασκευή',
    'prog.sun': 'Κυριακή',
    'prog.vinyl': 'Vinyl night',
    'prog.vinyl.sub': 'Soul, bossa και ό,τι βγάλει η δισκοθήκη του μαγαζιού.',
    'prog.jazz': 'Live jazz trio',
    'prog.jazz.sub': 'Πιάνο, κοντραμπάσο, ντραμς. Δύο σετ, χωρίς είσοδο.',
    'prog.dj': 'DJ set — disco & funk',
    'prog.dj.sub': 'Το μπαρ δουλεύει μέχρι τις τρεις.',
    'prog.brunch': 'Brunch όλη μέρα',
    'prog.brunch.sub': 'Ζυμωτό ψωμί, αυγά, και εφημερίδες που δεν τις παίρνει κανείς.',

    /* --- rating --- */
    'rating.aria': '4,8 στα 5 αστέρια',
    'rating.count': 'από 512 κριτικές επισκεπτών',
    'chip.outdoor': 'Τραπεζάκια έξω',
    'chip.floors': 'Δύο όροφοι',
    'chip.live': 'Live μουσική',
    'chip.brunch': 'Brunch',
    'chip.veg': 'Χορτοφαγικές επιλογές',
    'chip.takeaway': 'Takeaway',
    'chip.dogs': 'Dog friendly',
    'chip.access': 'Προσβάσιμη είσοδος',
    'chip.cards': 'Κάρτες & ανέπαφες',
    'quote1':
      'Μπήκα για έναν espresso και έφυγα τρεις ώρες αργότερα. Το φταίξιμο το έχει ο καναπές δίπλα στο παράθυρο.',
    'quote2':
      'Το καλύτερο flat white του κέντρου, και η μόνη κουζίνα που σου σερβίρει brunch στις έξι το απόγευμα χωρίς να σε κοιτάξει περίεργα.',
    'quote3':
      'Πήγα για την τζαζ, έμεινα για το negroni. Δεν βιάζεται κανείς εδώ μέσα — ούτε τα ρολόγια στον τοίχο.',
    'quote.nav1': 'Κριτική 1',
    'quote.nav2': 'Κριτική 2',
    'quote.nav3': 'Κριτική 3',

    /* --- booking --- */
    'book.eyebrow': 'Κράτηση',
    'book.title': 'Κράτα τραπέζι σε μισό λεπτό',
    'book.lead':
      'Για παρέες πάνω από τέσσερα άτομα και για τα βράδια με μουσική, καλύτερα να μας το πεις από πριν. Θα σε πάρουμε τηλέφωνο για επιβεβαίωση.',
    'book.phone': 'Τηλέφωνο',
    'book.email': 'Email',
    'book.groups': 'Μεγάλες παρέες',
    'book.groups.value': 'έως 20 άτομα στο πατάρι',
    'book.name': 'Όνομα',
    'book.phoneField': 'Τηλέφωνο',
    'book.date': 'Ημερομηνία',
    'book.time': 'Ώρα',
    'book.people': 'Άτομα',
    'book.people.more': '7 ή περισσότερα',
    'book.note': 'Σημείωση',
    'book.note.optional': '(προαιρετικό)',
    'book.submit': 'Στείλε το αίτημα',
    'book.error': 'Συμπλήρωσε όνομα, ένα έγκυρο τηλέφωνο και ημερομηνία.',
    'book.success': 'Ευχαριστούμε! Θα σε πάρουμε τηλέφωνο στο {phone} για επιβεβαίωση.',

    /* --- visit --- */
    'visit.eyebrow': 'Πού & πότε',
    'visit.title': 'Ολύμπου 47, στα στενά της Άνω Πόλης',
    'visit.hours': 'Ωράριο',
    'visit.contact': 'Επικοινωνία',
    'visit.address': 'Διεύθυνση',
    'visit.addressValue': 'Ολύμπου 47<br />Θεσσαλονίκη 546 31',
    'visit.phone': 'Τηλέφωνο',
    'visit.service': 'Εξυπηρέτηση',
    'visit.serviceValue': 'Στο κατάστημα & takeaway<br />(χωρίς delivery)',
    'visit.call': 'Κάλεσε μας',
    'visit.map': 'Χάρτης — η περιοχή γύρω από την Ολύμπου, Θεσσαλονίκη',
    'day.1': 'Δευτέρα',
    'day.2': 'Τρίτη',
    'day.3': 'Τετάρτη',
    'day.4': 'Πέμπτη',
    'day.5': 'Παρασκευή',
    'day.6': 'Σάββατο',
    'day.0': 'Κυριακή',

    /* --- footer --- */
    'footer.blurb':
      'Καφέ & μπαρ στα στενά της Θεσσαλονίκης.<br />Ο χρόνος εδώ περπατάει.',
    'footer.nav': 'Πλοήγηση υποσέλιδου',
    'footer.demoLabel': 'Δείγμα ιστοσελίδας.',
    'footer.demo':
      'Το «Caffè Andante» είναι φανταστική επιχείρηση. Η διεύθυνση, το τηλέφωνο, οι τιμές, οι κριτικές και το πρόγραμμα είναι ενδεικτικά και δεν αντιστοιχούν σε υπαρκτό κατάστημα. Φωτογραφίες: Unsplash.',
    'footer.credit': 'Σχεδίαση & κατασκευή: το στούντιό σου',
    'footer.copy': '© {year} Caffè Andante — demo',

    /* --- misc --- */
    'qb.call': 'Κλήση',
    'qb.menu': 'Μενού',
    'qb.book': 'Κράτηση',
    'a11y.toTop': 'Επιστροφή στην κορυφή',
    'a11y.close': 'Κλείσιμο',
  },
}
