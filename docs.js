const Docma = require('docma');
console.log('[Docs]: Now building documentation...');

Docma
    .create()
    .build({
        app: {
            title: 'eris-commando',
            base: '/',
            entrance: 'content:readme',
            routing: 'query',
            server: Docma.ServerType.GITHUB
        },
        markdown: {
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: false,
            smartypants: false,
            tasks: false,
            emoji: true
        },
        src: [
            {
                readme: './README.md',
                commando: './lib/*/**/*.js'
            }
        ],
        dest: './docs',
        debug: true,
        jsdoc: { package: require('./package') },
        template: {
            options: {
                title: 'eris-commando',
                navItems: [
                    {
                        label: 'Home',
                        href: '?content=readme'
                    },
                    {
                        label: 'Docs',
                        href: '?api=commando',
                        iconClass: 'ico-book'
                    },
                    {
                        label: 'Source',
                        href: 'https://github.com/auguwu/eris-commando',
                        target: '_blank',
                        iconClass: 'ico-md ico-github'
                    }
                ]
            }
        }
    })
    .then(() => console.log('[Docs]: Documentation has been built in docs/ folder'))
    .catch((e) => console.error(`[Docs]: Unable to build documentation:\n${e.stack}`));