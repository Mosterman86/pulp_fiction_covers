/* ============================================================
   Judging by the Cover · CONTENT FILE
   Edit text, hotspots, lenses and questions here.

   PROOF OF CONCEPT: values in [square brackets] are placeholders
   and display as "to confirm". Lorem ipsum marks text still to write.

   Hotspots: x / y are percentages of the cover's width / height.
   r = spotlight radius (% of width). lens = one of the keys in LENSES.
   To place one: open a cover, press Shift+P, click the image.
   ============================================================ */

window.COVERS = {

  program: {
    title: "Judging by the Cover",
    eyebrow: "Pulp paperbacks, 1940s–1960s",
    lede: "Pulp covers were designed to stop you at the newsstand rack. Look again at how they sold danger, desire, and difference, and at who they expected to be looking.",
    contentNote: "These covers include sexualized and violent imagery. They are shown here for critical discussion."
  },

  /* The lenses used to read every cover */
  lenses: {
    gaze:      { label: "The gaze",   blurb: "Who is looking, who is looked at, and where the picture places you." },
    gender:    { label: "Gender",     blurb: "The roles men and women are given, and what they are allowed to do." },
    race:      { label: "Race",       blurb: "Who appears, who is missing, and who is shown only as exotic or threatening." },
    violence:  { label: "Violence",   blurb: "How danger and harm are staged as excitement." },
    sexuality: { label: "Sexuality",  blurb: "How desire is used to sell, and whose desire counts." },
    selling:   { label: "Selling it", blurb: "The design conventions of type, price, blurbs and logos that made a cover work on a crowded rack." }
  },

  /* Media literacy toolkit shown on the landing page */
  toolkit: [
    { q: "Who is looking?",     a: "Whose point of view does the picture put you in?" },
    { q: "Who is looked at?",   a: "Whose body is arranged to be seen, and how?" },
    { q: "Who is missing?",     a: "Who never appears, or appears only as a threat or an exotic detail?" },
    { q: "What is being sold?", a: "The story inside, or a promise of danger, sex or escape?" },
    { q: "What has changed?",   a: "How would this cover be made, or read, today?" }
  ],

  covers: [

    /* ------------------------------------------------- SANCTUARY */
    {
      id: "sanctuary",
      genre: "Literary reprint",
      title: "Sanctuary",
      author: "William Faulkner",
      tagline: "A literary novel sold like a crime thriller.",
      image: "images/covers/sanctuary.webp",
      size: [433, 731],
      alt: "Paperback cover. A red-haired woman in a green dress with a cut-out midriff stands against a white lattice, one hand on her hip and a cigarette in the other. A man in a hat stands in the left foreground with his back half-turned to us. A yellow band at top reads By the Author of Wild Palms.",
      book: {
        publisher: "Signet Books (New American Library)",
        series: "Signet 632",
        edition: "Paperback reprint · first published 1931",
        date: "[c. 1947–1950]",
        price: "[25¢]",
        artist: "[Cover artist to confirm]",
        accession: "[Accession no.]"
      },
      synopsis: [
        "Faulkner’s 1931 novel follows Temple Drake, a Mississippi college student who is stranded at a bootlegger’s hideout during Prohibition. She is assaulted by the gangster Popeye and held in a Memphis brothel.",
        "A lawyer, Horace Benbow, defends the bootlegger Lee Goodwin, who is wrongly accused of a murder Popeye committed. Temple’s false testimony convicts Goodwin, and a mob lynches him.",
        "Faulkner later called it a book written to make money, “the most horrific tale I could imagine.” It became his first commercial success."
      ],
      context: [
        "After the Second World War, paperback publishers put serious fiction on drugstore and bus-station racks next to crime and romance. They sold it the same way, with painted covers promising sex and danger.",
        "Signet issued Faulkner, Richard Wright, James T. Farrell and other literary authors in this format. The covers brought new readers to these writers. They also flattened difficult books into a single seductive image.",
        "In 1952 a U.S. House committee, led by Representative Ezekiel Gathings, investigated paperback covers as a threat to public morals. Covers like this one were part of what it had in mind."
      ],
      hotspots: [
        { x: 14, y: 30, r: 14, lens: "gaze", name: "The man in the hat",
          text: "We see the scene from just behind his shoulder. The picture places the viewer beside him, looking at her, which builds the male point of view into the composition itself." },
        { x: 59, y: 36, r: 10, lens: "gaze", name: "Her returned look",
          text: "She meets his gaze, cool and unafraid. The cover shows her as knowing and in control, an image very far from what happens to Temple Drake in the novel." },
        { x: 50, y: 53, r: 12, lens: "sexuality", name: "The cut-out dress",
          text: "A satin gown with a bare midriff and a bow at the chest. Fashion is used to signal availability. The dress tells the buyer what kind of story to expect." },
        { x: 67, y: 82, r: 9, lens: "gender", name: "Cigarette and hip",
          text: "Hand on hip, cigarette held low: the pose of the worldly “bad girl.” It suggests a woman who chose her situation, which shifts blame onto the victim before the book is even opened." },
        { x: 44, y: 28, r: 9, lens: "race", name: "Who isn’t here",
          text: "The novel takes place in a Mississippi shaped by segregation, and its characters include a Black man awaiting execution in the town jail. The cover’s world is entirely white. The South’s racial violence, which runs through the book, disappears from the selling image." },
        { x: 85, y: 30, r: 13, lens: "selling", name: "The lattice",
          text: "A white trellis fills the right side, part porch, part cage. It hints at confinement, and gives the title “Sanctuary” an ironic edge." },
        { x: 88, y: 85, r: 9, lens: "selling", name: "Trash can",
          text: "A dented garbage can sets the scene as sordid and back-alley. Small props like this told buyers which genre shelf the book belonged on." },
        { x: 58, y: 5, r: 12, lens: "selling", name: "“By the Author of Wild Palms”",
          text: "The yellow banner sells the book through Faulkner’s 1939 novel The Wild Palms. Linking a title to an earlier success is a standard paperback strategy." },
        { x: 50, y: 94, r: 12, lens: "selling", name: "“Complete and Unabridged”",
          text: "Paperback buyers often suspected reprints were cut. This promise appears on many covers of the period, reassuring readers they are getting the whole book." }
      ],
      analysis: {
        gaze: "The composition puts us over the man’s shoulder, so we share his view of her. She looks back, but at him, and the scene is arranged for the viewer’s pleasure. This is close to what film theorist Laura Mulvey, writing in 1975, called the male gaze: the camera, or here the painter, takes up a man’s point of view.",
        gender: "The novel’s Temple Drake is a frightened young woman who is abducted and abused. The cover turns her into a confident seductress. Recasting a victim as a temptress is one of the most consistent moves in pulp cover design.",
        race: "Faulkner’s Yoknapatawpha is a society built on racial hierarchy, and Black characters appear in the novel. The cover shows only white figures. The selling image keeps the sexual danger and drops the racial history.",
        violence: "The cover shows no violence at all. The menace is only implied, through the man’s stance and the shadowed setting, and the book’s actual brutality is replaced by allure.",
        sexuality: "Desire is the cover’s whole pitch. A literary novel about sexual violence is sold as a story of seduction, which tells us who the publisher imagined as the buyer.",
        selling: "Serious literature gets the same treatment as a crime novel: painted realism, a provocative woman, a reference to an earlier bestseller and a promise that nothing is cut. The cover made Faulkner sell; it also misdescribed him."
      },
      questions: [
        "What story would you expect from this cover? How does it compare with the summary of the novel?",
        "Where does the picture place you as a viewer? Whose side are you on?",
        "Is it fair to sell a serious book with a misleading cover if it brings in new readers?",
        "How are serious books with difficult subjects marketed today?"
      ]
    },

    /* ------------------------------------------ MURDERER'S HOLIDAY */
    {
      id: "murderers-holiday",
      genre: "Crime",
      title: "Murderer’s Holiday",
      author: "Donald Henderson Clarke",
      tagline: "Danger in the doorway, and the reader sees it first.",
      image: "images/covers/murderers-holiday.webp",
      size: [954, 1500],
      alt: "Paperback cover. A startled red-haired woman in a pale green dress and white gloves leans over an office desk, her hand in a handbag, a black telephone beside her. Behind her, a man in a hat stands in a doorway holding a gun. The title is in dripping red letters.",
      book: {
        publisher: "[Publisher to confirm]",
        series: "[Series no.]",
        edition: "Paperback",
        date: "[c. 1950]",
        price: "25¢",
        artist: "[Cover artist to confirm]",
        accession: "[Accession no.]"
      },
      synopsis: [
        "Placeholder synopsis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus, posuere velit aliquet.",
        "Donald Henderson Clarke (1887–1958) was a New York newspaperman turned novelist, best known for the gangster novel Louis Beretti (1929). [Biography to confirm.]"
      ],
      context: [
        "By 1950 mass-market paperbacks cost a quarter and sold wherever people waited or passed through: drugstores, newsstands, train and bus stations. A cover had a few seconds to catch a buyer’s eye on a crowded wire rack.",
        "Crime covers of this period drew on film noir: shadowed rooms, men in hats, guns half-hidden, and a woman at the center of the danger. Readers learned these signals as quickly as movie audiences did.",
        "The sticker from a bus-station bookseller on this copy is a reminder that these books were cheap, portable and meant to be used up."
      ],
      hotspots: [
        { x: 18, y: 31, r: 12, lens: "violence", name: "Man in the doorway",
          text: "A man in a hat and suit fills the doorway, gun drawn, half in shadow. He is the threat, placed at the edge of the frame where she can’t see him." },
        { x: 12, y: 40, r: 7, lens: "violence", name: "The gun",
          text: "The pistol is held low, almost hidden against his body. The cover offers violence about to happen, which keeps the buyer wondering." },
        { x: 64, y: 29, r: 10, lens: "gaze", name: "Her startled eyes",
          text: "She looks over her shoulder, but toward us rather than toward the man. We see the danger she has missed, which makes the reader a knowing watcher, not a participant." },
        { x: 53, y: 37, r: 10, lens: "sexuality", name: "The neckline",
          text: "Her body is turned so the low neckline faces the viewer. Even in a scene of danger, her body is arranged for display." },
        { x: 52, y: 50, r: 10, lens: "gender", name: "Gloved hands in the bag",
          text: "White gloves and a hand in someone else’s handbag: she is snooping, possibly hiding evidence. The woman is both the curious intruder and the likely victim, punished for looking." },
        { x: 84, y: 55, r: 9, lens: "selling", name: "The telephone",
          text: "A black desk phone sits just out of her reach. Phones on crime covers promise a call for help that never comes." },
        { x: 50, y: 64, r: 12, lens: "selling", name: "The open drawer",
          text: "Papers spill from an open drawer. Secrets, evidence, a search interrupted: the cover sets up a plot without explaining it." },
        { x: 48, y: 12, r: 18, lens: "violence", name: "Dripping title",
          text: "“Murderer’s” is lettered in red brush strokes that seem to drip. The type does the job of blood, so the picture itself can stay relatively restrained." },
        { x: 60, y: 3, r: 14, lens: "selling", name: "“Humor, excitement and slaughter”",
          text: "A newspaper review quote sells murder as entertainment, listing “slaughter” alongside humor as one of the book’s pleasures." },
        { x: 8, y: 4, r: 9, lens: "selling", name: "25¢ and a bus-station sticker",
          text: "The printed price and a “Bus Stop Books” sticker show where and how this copy was sold: cheaply, to travelers, as something to read and leave behind." },
        { x: 75, y: 40, r: 12, lens: "race", name: "A white office world",
          text: "Both figures are white, in a middle-class office. Crime covers of the period rarely showed people of color except as menacing stereotypes. Whiteness was the unmarked default for both hero and victim." }
      ],
      analysis: {
        gaze: "The viewer sees more than either character: the man behind her and the panic on her face. This kind of composition, sometimes called the “woman in peril” cover, makes looking itself the thrill. We are invited to watch a woman be frightened.",
        gender: "She is active, searching a desk, but the cover makes clear she will pay for it. Pulp often punished women who went where they didn’t belong, and the curious woman doubles as the victim.",
        race: "The scene is entirely white. In mainstream crime fiction of the 1940s and 50s, characters of color usually appeared, when they appeared at all, as criminals, servants or exotic dangers. The absence here is typical, and so normal it is easy not to notice.",
        violence: "The violence is suspended a moment before it happens. The gun, the dripping red title and the review quote all promise it, so the buyer has to open the book to get it.",
        sexuality: "The neckline and the turn of her body put sexuality into a scene that is about fear. Combining terror and allure in one female figure was a standard way of selling crime fiction.",
        selling: "A dripping title, a newspaper blurb, a price, a telephone, an open drawer: each detail is a familiar signal. Readers in 1950 could read this cover as fast as we read a movie poster today."
      },
      questions: [
        "What did you notice first: the woman, the man or the title? Why do you think that was?",
        "Why might the artist have her looking at us instead of at the danger behind her?",
        "Where do you see the “woman in peril” image today, in films, streaming thumbnails or ads?",
        "What does the bus-station sticker tell you about who read these books?"
      ]
    },

    /* --------------------------------------------------- MAROONED */
    {
      id: "marooned",
      genre: "Adventure",
      title: "Marooned",
      author: "Donald Barr Chidsey",
      tagline: "A woman offered as the prize.",
      image: "images/covers/marooned.webp",
      size: [992, 1500],
      alt: "Paperback cover on black. A pirate with an eye patch, patterned head scarf, gold earring and pipe fills the right side, a green parrot on his shoulder. At left a blonde woman in a torn purple gown is held from behind by a sailor with a knife. Below, small figures fight with swords by torchlight. The tagline reads A Captive Maiden for the Man Who Dares Take Her!",
      book: {
        publisher: "Ace Books",
        series: "Ace D-512",
        edition: "Paperback original (“First Book Publication”)",
        date: "[c. 1961]",
        price: "35¢",
        artist: "[Cover artist to confirm]",
        accession: "[Accession no.]"
      },
      synopsis: [
        "Placeholder synopsis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.",
        "Donald Barr Chidsey (1902–1981) wrote dozens of historical adventure novels and popular histories, many set at sea or in colonial America. [Biography to confirm.]"
      ],
      context: [
        "Ace Books, founded in 1952, specialized in genre paperbacks: westerns, science fiction, crime and historical adventure. Its D-prefix books sold for 35 cents, the price printed under the logo here.",
        "“First Book Publication” means this was a paperback original, written for the rack rather than reprinted from a hardcover. Originals were cheap to produce and often written to order for a genre.",
        "Pirate adventures had a long history in popular fiction and film, from Treasure Island (1883) to Hollywood swashbucklers. By the 1950s the eye patch, parrot and earring were a ready-made costume."
      ],
      hotspots: [
        { x: 55, y: 5, r: 18, lens: "gender", name: "“A Captive Maiden…”",
          text: "“A Captive Maiden for the Man Who Dares Take Her!” The tagline treats a woman as a prize to be won. Her consent is not part of the story being sold." },
        { x: 9, y: 45, r: 10, lens: "gender", name: "Eyes closed",
          text: "Her head falls back, eyes shut, lips parted. She is shown as passive, almost fainting, which is a standard pose for a woman in a scene of capture." },
        { x: 11, y: 57, r: 10, lens: "sexuality", name: "The torn gown",
          text: "Her dress has slipped from her shoulder. The struggle is painted so as to expose her. Violence and display are combined in one figure." },
        { x: 25, y: 47, r: 10, lens: "violence", name: "Knife and grip",
          text: "The sailor pins her with one arm and holds a knife in the other. Her capture is painted as a sideshow to the hero’s portrait." },
        { x: 55, y: 45, r: 16, lens: "gaze", name: "The hero’s face",
          text: "The pirate’s face fills the cover and looks past us, steady and in control. Men act and look; the woman is acted upon and looked at." },
        { x: 75, y: 42, r: 13, lens: "race", name: "Parrot and earring",
          text: "The tropical parrot and gold earring stand in for the Caribbean. The setting is reduced to exotic props, with none of the people who lived there." },
        { x: 88, y: 86, r: 13, lens: "race", name: "Whose Caribbean?",
          text: "Piracy in the Caribbean was bound up with slavery and colonial violence, and many crews included African and Indigenous sailors. The cover imagines it as an adventure for white men." },
        { x: 50, y: 88, r: 22, lens: "violence", name: "Torchlit sword fight",
          text: "A band of tiny figures fights with swords and torches. Violence becomes background pattern, a promise of action rather than a picture of harm." },
        { x: 5, y: 7, r: 8, lens: "selling", name: "Ace, 35¢, D-512",
          text: "Logo, price and series number are stacked in the corner where buyers flipping through a rack would see them first." },
        { x: 82, y: 96, r: 12, lens: "selling", name: "“First Book Publication”",
          text: "A selling point: this story is new, not a reprint you might already own." }
      ],
      analysis: {
        gaze: "The hero looks out past the viewer, steady and unreadable. The woman’s eyes are closed. On this cover men look and act, and the woman exists to be seen.",
        gender: "The tagline makes the woman a reward for male daring. In the inset she is literally held in place. The gender roles are as fixed as the pirate costume.",
        race: "The Caribbean of the golden age of piracy was a world of slavery, colonial war and mixed crews. Here it is a backdrop of parrots and gold earrings, and an adventure for white men. Exotic detail stands in for the region and its people.",
        violence: "Violence is everywhere but never shown as harm: a knife held to a woman, a sword fight reduced to a decorative strip. The cover sells risk as fun.",
        sexuality: "The capture scene doubles as a pin-up. The torn gown and fainting pose eroticize her helplessness, a common and troubling convention in adventure fiction.",
        selling: "A huge slab-serif title, a bold tagline, a hero’s close-up and an action strip: the layout gives the buyer the whole genre in one glance."
      },
      questions: [
        "Read the tagline aloud. How does it sound to you today?",
        "Compare where the hero looks with where the woman looks. What does that say about each of them?",
        "What does the parrot do in this picture?",
        "How are pirates and the Caribbean shown in films and games now? What has changed, and what hasn’t?"
      ]
    },

    /* ------------------------------------------------ BOGUS LOVER */
    {
      id: "bogus-lover",
      genre: "Adult paperback",
      title: "Bogus Lover",
      author: "Hy Silver",
      tagline: "Femininity as costume, and as weapon.",
      image: "images/covers/bogus-lover.webp",
      size: [968, 1500],
      alt: "Paperback cover on green. A blonde woman in sunglasses and a fitted blue dress looks back over her shoulder, a cigarette in one hand and gold bracelets on her wrist. Beside her floats a padded bra, and in the lower left a blonde wig sits on a blank mannequin head with a heart for a face. Text reads She used her lush body as bait in a deadly game of deceit!",
      book: {
        publisher: "[NSL — publisher to confirm]",
        series: "[Series no.]",
        edition: "Paperback original",
        date: "[c. early 1960s]",
        price: "50¢",
        artist: "[Cover artist to confirm]",
        accession: "[Accession no.]"
      },
      synopsis: [
        "Placeholder synopsis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum.",
        "“Hy Silver” is likely a pseudonym. Writers for adult paperback lines often worked under several names. [To confirm.]"
      ],
      context: [
        "In the late 1950s and 1960s a wave of “adult” or “sleaze” paperbacks filled the racks, many from small publishers. They promised more explicit stories than mainstream books, though the covers stayed just inside the law.",
        "These books were produced quickly and cheaply, often by writers using pen names. Many were sold from the back of the store or under the counter.",
        "The price has doubled from the 25-cent paperbacks of a decade earlier. The pencilled numbers at the top are a later bookseller’s inventory marks, part of this copy’s life after its first sale."
      ],
      hotspots: [
        { x: 38, y: 21, r: 10, lens: "gaze", name: "Sunglasses",
          text: "She looks back at us, but her eyes are hidden. She can watch without being read, which makes her look dangerous rather than vulnerable." },
        { x: 30, y: 47, r: 15, lens: "gaze", name: "The over-the-shoulder pose",
          text: "Body turned away, face turned back: a classic pin-up pose that shows the figure from the side and still meets the viewer’s eye." },
        { x: 26, y: 30, r: 10, lens: "race", name: "The blonde ideal",
          text: "Platinum hair, pale skin, red lips. Pulp covers returned again and again to one narrow, white standard of beauty, and treated it as simply what “beautiful” meant." },
        { x: 52, y: 50, r: 9, lens: "gender", name: "Cigarette and bracelets",
          text: "Gold bangles and a cigarette held at the fingertips: signs of money, worldliness and self-possession, the femme fatale’s kit." },
        { x: 76, y: 64, r: 15, lens: "gender", name: "The padded bra",
          text: "A padded bra hangs in the air beside her. Along with the wig, it suggests that the figure we see is assembled. Femininity is shown as a costume that can be put on." },
        { x: 17, y: 82, r: 14, lens: "gender", name: "Wig on a mannequin",
          text: "A blonde wig sits on a blank head with a heart for a face. Hair, the cover’s main sign of beauty, turns out to be removable. The props raise a question the cover won’t answer: who, or what, is the “bogus lover”?" },
        { x: 76, y: 86, r: 16, lens: "violence", name: "“…a deadly game of deceit!”",
          text: "“She used her lush body as bait in a deadly game of deceit!” Her body is described as a weapon. Danger is located in female sexuality, the core idea of the femme fatale." },
        { x: 46, y: 30, r: 10, lens: "selling", name: "Hard shadow",
          text: "A black shadow behind her borrows the lighting of film noir and hints at menace." },
        { x: 75, y: 24, r: 18, lens: "selling", name: "Title lettering",
          text: "Tall, condensed cream letters stacked down the right side. The title is placed so it reads clearly even when the book is half-hidden in a rack." },
        { x: 4, y: 8, r: 6, lens: "selling", name: "NSL logo and 50¢",
          text: "A small publisher’s logo and a price twice that of 1950s paperbacks: adult titles charged more for what they promised." },
        { x: 60, y: 4, r: 12, lens: "selling", name: "Pencilled inventory marks",
          text: "Handwritten numbers from a later bookseller. Cheap paperbacks often passed through many hands and many shops." }
      ],
      analysis: {
        gaze: "She looks back, but the sunglasses mean we can’t meet her eyes. The over-the-shoulder pose still offers her body to the viewer. The cover sells both a look at her and the thrill that she might be looking at you.",
        gender: "The wig and padded bra present femininity as something constructed. That could have been a radical idea. Here it is mainly used for titillation and suspicion: a beautiful woman might not be what she seems.",
        race: "The ideal woman on this cover, as on nearly all pulp covers, is white and blonde. The absence of anyone else is part of the image. Beauty, desire and danger are all imagined in white.",
        violence: "The tagline promises a “deadly game,” but the threat comes from her. The femme fatale turns male anxiety about women’s sexuality into a story where the woman is to blame.",
        sexuality: "Adult paperbacks pushed sexuality further than mainstream books, but the cover still works by suggestion: a bra, a pose, “lush body.” What is hinted at sells more than what is shown.",
        selling: "Condensed type, a hard noir shadow, props that pose a riddle and a tagline in a contrasting color. The cover is built to make a passing buyer stop and wonder."
      },
      questions: [
        "What do you think the wig and the bra are doing on this cover?",
        "How do the sunglasses change the way you read her?",
        "Is the femme fatale an empowering figure or a dangerous stereotype? Can she be both?",
        "Where do you see femininity shown as a performance today?"
      ]
    }
  ]
};
