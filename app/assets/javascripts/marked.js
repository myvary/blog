/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */ !(function(e) {
  'use strict';
  var t = {
    newline: /^\n+/,
    code: /^( {4}[^\n]+\n*)+/,
    fences: d,
    hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
    heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
    nptable: d,
    blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
    list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
    html:
      '^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?\\?>\\n*|<![A-Z][\\s\\S]*?>\\n*|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=\\h*\\n)[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=\\h*\\n)[\\s\\S]*?(?:\\n{2,}|$))',
    def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
    table: d,
    lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
    paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading| {0,3}>|<\/?(?:tag)(?: +|\n|\/?>)|<(?:script|pre|style|!--))[^\n]+)*)/,
    text: /^[^\n]+/,
  };

  function n(e) {
    (this.tokens = []),
      (this.tokens.links = {}),
      (this.options = e || m.defaults),
      (this.rules = t.normal),
      this.options.pedantic
        ? (this.rules = t.pedantic)
        : this.options.gfm &&
          (this.options.tables
            ? (this.rules = t.tables)
            : (this.rules = t.gfm));
  }
  (t._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/),
    (t._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/),
    (t.def = p(t.def)
      .replace('label', t._label)
      .replace('title', t._title)
      .getRegex()),
    (t.bullet = /(?:[*+-]|\d+\.)/),
    (t.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/),
    (t.item = p(t.item, 'gm')
      .replace(/bull/g, t.bullet)
      .getRegex()),
    (t.list = p(t.list)
      .replace(/bull/g, t.bullet)
      .replace(
        'hr',
        '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))',
      )
      .replace('def', '\\n+(?=' + t.def.source + ')')
      .getRegex()),
    (t._tag =
      'address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul'),
    (t._comment = /<!--(?!-?>)[\s\S]*?-->/),
    (t.html = p(t.html, 'i')
      .replace('comment', t._comment)
      .replace('tag', t._tag)
      .replace(
        'attribute',
        / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/,
      )
      .getRegex()),
    (t.paragraph = p(t.paragraph)
      .replace('hr', t.hr)
      .replace('heading', t.heading)
      .replace('lheading', t.lheading)
      .replace('tag', t._tag)
      .getRegex()),
    (t.blockquote = p(t.blockquote)
      .replace('paragraph', t.paragraph)
      .getRegex()),
    (t.normal = f({}, t)),
    (t.gfm = f({}, t.normal, {
      fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\n? *\1 *(?:\n+|$)/,
      paragraph: /^/,
      heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/,
    })),
    (t.gfm.paragraph = p(t.paragraph)
      .replace(
        '(?!',
        '(?!' +
          t.gfm.fences.source.replace('\\1', '\\2') +
          '|' +
          t.list.source.replace('\\1', '\\3') +
          '|',
      )
      .getRegex()),
    (t.tables = f({}, t.gfm, {
      nptable: /^ *([^|\n ].*\|.*)\n *([-:]+ *\|[-| :]*)(?:\n((?:.*[^>\n ].*(?:\n|$))*)\n*|$)/,
      table: /^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/,
    })),
    (t.pedantic = f({}, t.normal, {
      html: p(
        '^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))',
      )
        .replace('comment', t._comment)
        .replace(
          /tag/g,
          '(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b',
        )
        .getRegex(),
      def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    })),
    (n.rules = t),
    (n.lex = function(e, t) {
      return new n(t).lex(e);
    }),
    (n.prototype.lex = function(e) {
      return (
        (e = e
          .replace(/\r\n|\r/g, '\n')
          .replace(/\t/g, '    ')
          .replace(/\u00a0/g, ' ')
          .replace(/\u2424/g, '\n')),
        this.token(e, !0)
      );
    }),
    (n.prototype.token = function(e, n) {
      var r, s, i, l, o, a, h, p, u, c, g, d, f;
      for (e = e.replace(/^ +$/gm, ''); e; )
        if (
          ((i = this.rules.newline.exec(e)) &&
            ((e = e.substring(i[0].length)),
            i[0].length > 1 &&
              this.tokens.push({
                type: 'space',
              })),
          (i = this.rules.code.exec(e)))
        )
          (e = e.substring(i[0].length)),
            (i = i[0].replace(/^ {4}/gm, '')),
            this.tokens.push({
              type: 'code',
              text: this.options.pedantic ? i : i.replace(/\n+$/, ''),
            });
        else if ((i = this.rules.fences.exec(e)))
          (e = e.substring(i[0].length)),
            this.tokens.push({
              type: 'code',
              lang: i[2],
              text: i[3] || '',
            });
        else if ((i = this.rules.heading.exec(e)))
          (e = e.substring(i[0].length)),
            this.tokens.push({
              type: 'heading',
              depth: i[1].length,
              text: i[2],
            });
        else if (
          n &&
          (i = this.rules.nptable.exec(e)) &&
          (a = {
            type: 'table',
            header: b(i[1].replace(/^ *| *\| *$/g, '')),
            align: i[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
            cells: i[3] ? i[3].replace(/\n$/, '').split('\n') : [],
          }).header.length === a.align.length
        ) {
          for (e = e.substring(i[0].length), p = 0; p < a.align.length; p++)
            /^ *-+: *$/.test(a.align[p])
              ? (a.align[p] = 'right')
              : /^ *:-+: *$/.test(a.align[p])
                ? (a.align[p] = 'center')
                : /^ *:-+ *$/.test(a.align[p])
                  ? (a.align[p] = 'left')
                  : (a.align[p] = null);
          for (p = 0; p < a.cells.length; p++)
            a.cells[p] = b(a.cells[p], a.header.length);
          this.tokens.push(a);
        } else if ((i = this.rules.hr.exec(e)))
          (e = e.substring(i[0].length)),
            this.tokens.push({
              type: 'hr',
            });
        else if ((i = this.rules.blockquote.exec(e)))
          (e = e.substring(i[0].length)),
            this.tokens.push({
              type: 'blockquote_start',
            }),
            (i = i[0].replace(/^ *> ?/gm, '')),
            this.token(i, n),
            this.tokens.push({
              type: 'blockquote_end',
            });
        else if ((i = this.rules.list.exec(e))) {
          for (
            e = e.substring(i[0].length),
              g = (l = i[2]).length > 1,
              this.tokens.push({
                type: 'list_start',
                ordered: g,
                start: g ? +l : '',
              }),
              r = !1,
              c = (i = i[0].match(this.rules.item)).length,
              p = 0;
            p < c;
            p++
          )
            (h = (a = i[p]).length),
              ~(a = a.replace(/^ *([*+-]|\d+\.) +/, '')).indexOf('\n ') &&
                ((h -= a.length),
                (a = this.options.pedantic
                  ? a.replace(/^ {1,4}/gm, '')
                  : a.replace(new RegExp('^ {1,' + h + '}', 'gm'), ''))),
              this.options.smartLists &&
                p !== c - 1 &&
                (l === (o = t.bullet.exec(i[p + 1])[0]) ||
                  (l.length > 1 && o.length > 1) ||
                  ((e = i.slice(p + 1).join('\n') + e), (p = c - 1))),
              (s = r || /\n\n(?!\s*$)/.test(a)),
              p !== c - 1 &&
                ((r = '\n' === a.charAt(a.length - 1)), s || (s = r)),
              (f = void 0),
              (d = /^\[[ xX]\] /.test(a)) &&
                ((f = ' ' !== a[1]), (a = a.replace(/^\[[ xX]\] +/, ''))),
              this.tokens.push({
                type: s ? 'loose_item_start' : 'list_item_start',
                task: d,
                checked: f,
              }),
              this.token(a, !1),
              this.tokens.push({
                type: 'list_item_end',
              });
          this.tokens.push({
            type: 'list_end',
          });
        } else if ((i = this.rules.html.exec(e)))
          (e = e.substring(i[0].length)),
            this.tokens.push({
              type: this.options.sanitize ? 'paragraph' : 'html',
              pre:
                !this.options.sanitizer &&
                ('pre' === i[1] || 'script' === i[1] || 'style' === i[1]),
              text: i[0],
            });
        else if (n && (i = this.rules.def.exec(e)))
          (e = e.substring(i[0].length)),
            i[3] && (i[3] = i[3].substring(1, i[3].length - 1)),
            (u = i[1].toLowerCase().replace(/\s+/g, ' ')),
            this.tokens.links[u] ||
              (this.tokens.links[u] = {
                href: i[2],
                title: i[3],
              });
        else if (
          n &&
          (i = this.rules.table.exec(e)) &&
          (a = {
            type: 'table',
            header: b(i[1].replace(/^ *| *\| *$/g, '')),
            align: i[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
            cells: i[3] ? i[3].replace(/(?: *\| *)?\n$/, '').split('\n') : [],
          }).header.length === a.align.length
        ) {
          for (e = e.substring(i[0].length), p = 0; p < a.align.length; p++)
            /^ *-+: *$/.test(a.align[p])
              ? (a.align[p] = 'right')
              : /^ *:-+: *$/.test(a.align[p])
                ? (a.align[p] = 'center')
                : /^ *:-+ *$/.test(a.align[p])
                  ? (a.align[p] = 'left')
                  : (a.align[p] = null);
          for (p = 0; p < a.cells.length; p++)
            a.cells[p] = b(
              a.cells[p].replace(/^ *\| *| *\| *$/g, ''),
              a.header.length,
            );
          this.tokens.push(a);
        } else if ((i = this.rules.lheading.exec(e)))
          (e = e.substring(i[0].length)),
            this.tokens.push({
              type: 'heading',
              depth: '=' === i[2] ? 1 : 2,
              text: i[1],
            });
        else if (n && (i = this.rules.paragraph.exec(e)))
          (e = e.substring(i[0].length)),
            this.tokens.push({
              type: 'paragraph',
              text:
                '\n' === i[1].charAt(i[1].length - 1)
                  ? i[1].slice(0, -1)
                  : i[1],
            });
        else if ((i = this.rules.text.exec(e)))
          (e = e.substring(i[0].length)),
            this.tokens.push({
              type: 'text',
              text: i[0],
            });
        else if (e)
          throw new Error('Infinite loop on byte: ' + e.charCodeAt(0));
      return this.tokens;
    });
  var r = {
    escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
    autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
    url: d,
    tag:
      '^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>',
    link: /^!?\[(label)\]\(href(?:\s+(title))?\s*\)/,
    reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
    nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
    strong: /^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)|^__([^\s])__(?!_)|^\*\*([^\s])\*\*(?!\*)/,
    em: /^_([^\s][\s\S]*?[^\s_])_(?!_)|^_([^\s_][\s\S]*?[^\s])_(?!_)|^\*([^\s][\s\S]*?[^\s*])\*(?!\*)|^\*([^\s*][\s\S]*?[^\s])\*(?!\*)|^_([^\s_])_(?!_)|^\*([^\s*])\*(?!\*)/,
    code: /^(`+)\s*([\s\S]*?[^`]?)\s*\1(?!`)/,
    br: /^ {2,}\n(?!\s*$)/,
    del: d,
    text: /^[\s\S]+?(?=[\\<!\[`*]|\b_| {2,}\n|$)/,
  };

  function s(e, t) {
    if (
      ((this.options = t || m.defaults),
      (this.links = e),
      (this.rules = r.normal),
      (this.renderer = this.options.renderer || new i()),
      (this.renderer.options = this.options),
      !this.links)
    )
      throw new Error('Tokens array requires a `links` property.');
    this.options.pedantic
      ? (this.rules = r.pedantic)
      : this.options.gfm &&
        (this.options.breaks ? (this.rules = r.breaks) : (this.rules = r.gfm));
  }
  function i(e) {
    this.options = e || m.defaults;
  }
  function l() {}
  function o(e) {
    (this.tokens = []),
      (this.token = null),
      (this.options = e || m.defaults),
      (this.options.renderer = this.options.renderer || new i()),
      (this.renderer = this.options.renderer),
      (this.renderer.options = this.options);
  }
  function a(e, t) {
    return e
      .replace(t ? /&/g : /&(?!#?\w+;)/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  function h(e) {
    return e.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi, function(
      e,
      t,
    ) {
      return 'colon' === (t = t.toLowerCase())
        ? ':'
        : '#' === t.charAt(0)
          ? 'x' === t.charAt(1)
            ? String.fromCharCode(parseInt(t.substring(2), 16))
            : String.fromCharCode(+t.substring(1))
          : '';
    });
  }
  function p(e, t) {
    return (
      (e = e.source || e),
      (t = t || ''),
      {
        replace: function(t, n) {
          return (
            (n = (n = n.source || n).replace(/(^|[^\[])\^/g, '$1')),
            (e = e.replace(t, n)),
            this
          );
        },
        getRegex: function() {
          return new RegExp(e, t);
        },
      }
    );
  }
  function u(e, t) {
    return (
      c[' ' + e] ||
        (/^[^:]+:\/*[^/]*$/.test(e)
          ? (c[' ' + e] = e + '/')
          : (c[' ' + e] = e.replace(/[^/]*$/, ''))),
      (e = c[' ' + e]),
      '//' === t.slice(0, 2)
        ? e.replace(/:[\s\S]*/, ':') + t
        : '/' === t.charAt(0)
          ? e.replace(/(:\/*[^/]*)[\s\S]*/, '$1') + t
          : e + t
    );
  }
  (r._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g),
    (r._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/),
    (r._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/),
    (r.autolink = p(r.autolink)
      .replace('scheme', r._scheme)
      .replace('email', r._email)
      .getRegex()),
    (r._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/),
    (r.tag = p(r.tag)
      .replace('comment', t._comment)
      .replace('attribute', r._attribute)
      .getRegex()),
    (r._label = /(?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?/),
    (r._href = /\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?)/),
    (r._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/),
    (r.link = p(r.link)
      .replace('label', r._label)
      .replace('href', r._href)
      .replace('title', r._title)
      .getRegex()),
    (r.reflink = p(r.reflink)
      .replace('label', r._label)
      .getRegex()),
    (r.normal = f({}, r)),
    (r.pedantic = f({}, r.normal, {
      strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
      em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,
      link: p(/^!?\[(label)\]\((.*?)\)/)
        .replace('label', r._label)
        .getRegex(),
      reflink: p(/^!?\[(label)\]\s*\[([^\]]*)\]/)
        .replace('label', r._label)
        .getRegex(),
    })),
    (r.gfm = f({}, r.normal, {
      escape: p(r.escape)
        .replace('])', '~|])')
        .getRegex(),
      url: p(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/)
        .replace('email', r._email)
        .getRegex(),
      _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
      del: /^~~(?=\S)([\s\S]*?\S)~~/,
      text: p(r.text)
        .replace(']|', '~]|')
        .replace(
          '|',
          "|https?://|ftp://|www\\.|[a-zA-Z0-9.!#$%&'*+/=?^_`{\\|}~-]+@|",
        )
        .getRegex(),
    })),
    (r.breaks = f({}, r.gfm, {
      br: p(r.br)
        .replace('{2,}', '*')
        .getRegex(),
      text: p(r.gfm.text)
        .replace('{2,}', '*')
        .getRegex(),
    })),
    (s.rules = r),
    (s.output = function(e, t, n) {
      return new s(t, n).output(e);
    }),
    (s.prototype.output = function(e) {
      for (var t, n, r, i, l, o = ''; e; )
        if ((l = this.rules.escape.exec(e)))
          (e = e.substring(l[0].length)), (o += l[1]);
        else if ((l = this.rules.autolink.exec(e)))
          (e = e.substring(l[0].length)),
            (r =
              '@' === l[2]
                ? 'mailto:' + (n = a(this.mangle(l[1])))
                : (n = a(l[1]))),
            (o += this.renderer.link(r, null, n));
        else if (this.inLink || !(l = this.rules.url.exec(e))) {
          if ((l = this.rules.tag.exec(e)))
            !this.inLink && /^<a /i.test(l[0])
              ? (this.inLink = !0)
              : this.inLink && /^<\/a>/i.test(l[0]) && (this.inLink = !1),
              (e = e.substring(l[0].length)),
              (o += this.options.sanitize
                ? this.options.sanitizer
                  ? this.options.sanitizer(l[0])
                  : a(l[0])
                : l[0]);
          else if ((l = this.rules.link.exec(e)))
            (e = e.substring(l[0].length)),
              (this.inLink = !0),
              (r = l[2]),
              this.options.pedantic
                ? (t = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(r))
                  ? ((r = t[1]), (i = t[3]))
                  : (i = '')
                : (i = l[3] ? l[3].slice(1, -1) : ''),
              (r = r.trim().replace(/^<([\s\S]*)>$/, '$1')),
              (o += this.outputLink(l, {
                href: s.escapes(r),
                title: s.escapes(i),
              })),
              (this.inLink = !1);
          else if (
            (l = this.rules.reflink.exec(e)) ||
            (l = this.rules.nolink.exec(e))
          ) {
            if (
              ((e = e.substring(l[0].length)),
              (t = (l[2] || l[1]).replace(/\s+/g, ' ')),
              !(t = this.links[t.toLowerCase()]) || !t.href)
            ) {
              (o += l[0].charAt(0)), (e = l[0].substring(1) + e);
              continue;
            }
            (this.inLink = !0),
              (o += this.outputLink(l, t)),
              (this.inLink = !1);
          } else if ((l = this.rules.strong.exec(e)))
            (e = e.substring(l[0].length)),
              (o += this.renderer.strong(
                this.output(l[4] || l[3] || l[2] || l[1]),
              ));
          else if ((l = this.rules.em.exec(e)))
            (e = e.substring(l[0].length)),
              (o += this.renderer.em(
                this.output(l[6] || l[5] || l[4] || l[3] || l[2] || l[1]),
              ));
          else if ((l = this.rules.code.exec(e)))
            (e = e.substring(l[0].length)),
              (o += this.renderer.codespan(a(l[2].trim(), !0)));
          else if ((l = this.rules.br.exec(e)))
            (e = e.substring(l[0].length)), (o += this.renderer.br());
          else if ((l = this.rules.del.exec(e)))
            (e = e.substring(l[0].length)),
              (o += this.renderer.del(this.output(l[1])));
          else if ((l = this.rules.text.exec(e)))
            (e = e.substring(l[0].length)),
              (o += this.renderer.text(a(this.smartypants(l[0]))));
          else if (e)
            throw new Error('Infinite loop on byte: ' + e.charCodeAt(0));
        } else
          (l[0] = this.rules._backpedal.exec(l[0])[0]),
            (e = e.substring(l[0].length)),
            '@' === l[2]
              ? (r = 'mailto:' + (n = a(l[0])))
              : ((n = a(l[0])), (r = 'www.' === l[1] ? 'http://' + n : n)),
            (o += this.renderer.link(r, null, n));
      return o;
    }),
    (s.escapes = function(e) {
      return e ? e.replace(s.rules._escapes, '$1') : e;
    }),
    (s.prototype.outputLink = function(e, t) {
      var n = t.href,
        r = t.title ? a(t.title) : null;
      return '!' !== e[0].charAt(0)
        ? this.renderer.link(n, r, this.output(e[1]))
        : this.renderer.image(n, r, a(e[1]));
    }),
    (s.prototype.smartypants = function(e) {
      return this.options.smartypants
        ? e
            .replace(/---/g, '—')
            .replace(/--/g, '–')
            .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1‘')
            .replace(/'/g, '’')
            .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1“')
            .replace(/"/g, '”')
            .replace(/\.{3}/g, '…')
        : e;
    }),
    (s.prototype.mangle = function(e) {
      if (!this.options.mangle) return e;
      for (var t, n = '', r = e.length, s = 0; s < r; s++)
        (t = e.charCodeAt(s)),
          Math.random() > 0.5 && (t = 'x' + t.toString(16)),
          (n += '&#' + t + ';');
      return n;
    }),
    (i.prototype.code = function(e, t, n) {
      if (this.options.highlight) {
        var r = this.options.highlight(e, t);
        null != r && r !== e && ((n = !0), (e = r));
      }
      return t
        ? '<pre><code class="' +
            this.options.langPrefix +
            a(t, !0) +
            '">' +
            (n ? e : a(e, !0)) +
            '</code></pre>\n'
        : '<pre><code>' + (n ? e : a(e, !0)) + '</code></pre>';
    }),
    (i.prototype.blockquote = function(e) {
      return '<blockquote>\n' + e + '</blockquote>\n';
    }),
    (i.prototype.html = function(e) {
      return e;
    }),
    (i.prototype.heading = function(e, t, n) {
      return this.options.headerIds
        ? '<h' +
            t +
            ' id="' +
            this.options.headerPrefix +
            n.toLowerCase().replace(/[^\w]+/g, '-') +
            '">' +
            e +
            '</h' +
            t +
            '>\n'
        : '<h' + t + '>' + e + '</h' + t + '>\n';
    }),
    (i.prototype.hr = function() {
      return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
    }),
    (i.prototype.list = function(e, t, n) {
      var r = t ? 'ol' : 'ul';
      return (
        '<' +
        r +
        (t && 1 !== n ? ' start="' + n + '"' : '') +
        '>\n' +
        e +
        '</' +
        r +
        '>\n'
      );
    }),
    (i.prototype.listitem = function(e) {
      return '<li>' + e + '</li>\n';
    }),
    (i.prototype.checkbox = function(e) {
      return (
        '<input ' +
        (e ? 'checked="" ' : '') +
        'disabled="" type="checkbox"' +
        (this.options.xhtml ? ' /' : '') +
        '> '
      );
    }),
    (i.prototype.paragraph = function(e) {
      return '<p>' + e + '</p>\n';
    }),
    (i.prototype.table = function(e, t) {
      return (
        t && (t = '<tbody>' + t + '</tbody>'),
        '<table>\n<thead>\n' + e + '</thead>\n' + t + '</table>\n'
      );
    }),
    (i.prototype.tablerow = function(e) {
      return '<tr>\n' + e + '</tr>\n';
    }),
    (i.prototype.tablecell = function(e, t) {
      var n = t.header ? 'th' : 'td';
      return (
        (t.align ? '<' + n + ' align="' + t.align + '">' : '<' + n + '>') +
        e +
        '</' +
        n +
        '>\n'
      );
    }),
    (i.prototype.strong = function(e) {
      return '<strong>' + e + '</strong>';
    }),
    (i.prototype.em = function(e) {
      return '<em>' + e + '</em>';
    }),
    (i.prototype.codespan = function(e) {
      return '<code>' + e + '</code>';
    }),
    (i.prototype.br = function() {
      return this.options.xhtml ? '<br/>' : '<br>';
    }),
    (i.prototype.del = function(e) {
      return '<del>' + e + '</del>';
    }),
    (i.prototype.link = function(e, t, n) {
      if (this.options.sanitize) {
        try {
          var r = decodeURIComponent(h(e))
            .replace(/[^\w:]/g, '')
            .toLowerCase();
        } catch (e) {
          return n;
        }
        if (
          0 === r.indexOf('javascript:') ||
          0 === r.indexOf('vbscript:') ||
          0 === r.indexOf('data:')
        )
          return n;
      }
      this.options.baseUrl && !g.test(e) && (e = u(this.options.baseUrl, e));
      try {
        e = encodeURI(e).replace(/%25/g, '%');
      } catch (e) {
        return n;
      }
      var s = '<a href="' + a(e) + '"';
      return t && (s += ' title="' + t + '"'), (s += '>' + n + '</a>');
    }),
    (i.prototype.image = function(e, t, n) {
      this.options.baseUrl && !g.test(e) && (e = u(this.options.baseUrl, e));
      var r = '<img src="' + e + '" alt="' + n + '"';
      return (
        t && (r += ' title="' + t + '"'), (r += this.options.xhtml ? '/>' : '>')
      );
    }),
    (i.prototype.text = function(e) {
      return e;
    }),
    (l.prototype.strong = l.prototype.em = l.prototype.codespan = l.prototype.del = l.prototype.text = function(
      e,
    ) {
      return e;
    }),
    (l.prototype.link = l.prototype.image = function(e, t, n) {
      return '' + n;
    }),
    (l.prototype.br = function() {
      return '';
    }),
    (o.parse = function(e, t) {
      return new o(t).parse(e);
    }),
    (o.prototype.parse = function(e) {
      (this.inline = new s(e.links, this.options)),
        (this.inlineText = new s(
          e.links,
          f({}, this.options, {
            renderer: new l(),
          }),
        )),
        (this.tokens = e.reverse());
      for (var t = ''; this.next(); ) t += this.tok();
      return t;
    }),
    (o.prototype.next = function() {
      return (this.token = this.tokens.pop());
    }),
    (o.prototype.peek = function() {
      return this.tokens[this.tokens.length - 1] || 0;
    }),
    (o.prototype.parseText = function() {
      for (var e = this.token.text; 'text' === this.peek().type; )
        e += '\n' + this.next().text;
      return this.inline.output(e);
    }),
    (o.prototype.tok = function() {
      switch (this.token.type) {
        case 'space':
          return '';
        case 'hr':
          return this.renderer.hr();
        case 'heading':
          return this.renderer.heading(
            this.inline.output(this.token.text),
            this.token.depth,
            h(this.inlineText.output(this.token.text)),
          );
        case 'code':
          return this.renderer.code(
            this.token.text,
            this.token.lang,
            this.token.escaped,
          );
        case 'table':
          var e,
            t,
            n,
            r,
            s = '',
            i = '';
          for (n = '', e = 0; e < this.token.header.length; e++)
            n += this.renderer.tablecell(
              this.inline.output(this.token.header[e]),
              {
                header: !0,
                align: this.token.align[e],
              },
            );
          for (
            s += this.renderer.tablerow(n), e = 0;
            e < this.token.cells.length;
            e++
          ) {
            for (t = this.token.cells[e], n = '', r = 0; r < t.length; r++)
              n += this.renderer.tablecell(this.inline.output(t[r]), {
                header: !1,
                align: this.token.align[r],
              });
            i += this.renderer.tablerow(n);
          }
          return this.renderer.table(s, i);
        case 'blockquote_start':
          for (i = ''; 'blockquote_end' !== this.next().type; ) i += this.tok();
          return this.renderer.blockquote(i);
        case 'list_start':
          i = '';
          for (
            var l = this.token.ordered, o = this.token.start;
            'list_end' !== this.next().type;

          )
            i += this.tok();
          return this.renderer.list(i, l, o);
        case 'list_item_start':
          for (
            i = '',
              this.token.task &&
                (i += this.renderer.checkbox(this.token.checked));
            'list_item_end' !== this.next().type;

          )
            i += 'text' === this.token.type ? this.parseText() : this.tok();
          return this.renderer.listitem(i);
        case 'loose_item_start':
          for (i = ''; 'list_item_end' !== this.next().type; ) i += this.tok();
          return this.renderer.listitem(i);
        case 'html':
          return this.renderer.html(this.token.text);
        case 'paragraph':
          return this.renderer.paragraph(this.inline.output(this.token.text));
        case 'text':
          return this.renderer.paragraph(this.parseText());
      }
    });
  var c = {},
    g = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

  function d() {}
  function f(e) {
    for (var t, n, r = 1; r < arguments.length; r++)
      for (n in (t = arguments[r]))
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e;
  }
  function b(e, t) {
    var n = e.replace(/([^\\])\|/g, '$1 |').split(/ +\| */),
      r = 0;
    if (n.length > t) n.splice(t);
    else for (; n.length < t; ) n.push('');
    for (; r < n.length; r++) n[r] = n[r].replace(/\\\|/g, '|');
    return n;
  }
  function m(e, t, r) {
    if (null == e)
      throw new Error('marked(): input parameter is undefined or null');
    if ('string' != typeof e)
      throw new Error(
        'marked(): input parameter is of type ' +
          Object.prototype.toString.call(e) +
          ', string expected',
      );
    if (r || 'function' == typeof t) {
      r || ((r = t), (t = null));
      var s,
        i,
        l = (t = f({}, m.defaults, t || {})).highlight,
        h = 0;
      try {
        s = n.lex(e, t);
      } catch (e) {
        return r(e);
      }
      i = s.length;
      var p = function(e) {
        if (e) return (t.highlight = l), r(e);
        var n;
        try {
          n = o.parse(s, t);
        } catch (t) {
          e = t;
        }
        return (t.highlight = l), e ? r(e) : r(null, n);
      };
      if (!l || l.length < 3) return p();
      if ((delete t.highlight, !i)) return p();
      for (; h < s.length; h++)
        !(function(e) {
          'code' !== e.type
            ? --i || p()
            : l(e.text, e.lang, function(t, n) {
                return t
                  ? p(t)
                  : null == n || n === e.text
                    ? --i || p()
                    : ((e.text = n), (e.escaped = !0), void (--i || p()));
              });
        })(s[h]);
    } else
      try {
        return t && (t = f({}, m.defaults, t)), o.parse(n.lex(e, t), t);
      } catch (e) {
        if (
          ((e.message +=
            '\nPlease report this to https://github.com/markedjs/marked.'),
          (t || m.defaults).silent)
        )
          return (
            '<p>An error occurred:</p><pre>' + a(e.message + '', !0) + '</pre>'
          );
        throw e;
      }
  }
  (d.exec = d),
    (m.options = m.setOptions = function(e) {
      return f(m.defaults, e), m;
    }),
    (m.getDefaults = function() {
      return {
        baseUrl: null,
        breaks: !1,
        gfm: !0,
        headerIds: !0,
        headerPrefix: '',
        highlight: null,
        langPrefix: 'language-',
        mangle: !0,
        pedantic: !1,
        renderer: new i(),
        sanitize: !1,
        sanitizer: null,
        silent: !1,
        smartLists: !1,
        smartypants: !1,
        tables: !0,
        xhtml: !1,
      };
    }),
    (m.defaults = m.getDefaults()),
    (m.Parser = o),
    (m.parser = o.parse),
    (m.Renderer = i),
    (m.TextRenderer = l),
    (m.Lexer = n),
    (m.lexer = n.lex),
    (m.InlineLexer = s),
    (m.inlineLexer = s.output),
    (m.parse = m),
    'undefined' != typeof module && 'object' == typeof exports
      ? (module.exports = m)
      : 'function' == typeof define && define.amd
        ? define(function() {
            return m;
          })
        : (e.marked = m);
})(this || ('undefined' != typeof window ? window : global));