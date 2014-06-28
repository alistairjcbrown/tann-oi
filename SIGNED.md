##### Signed by https://keybase.io/alistairjcbrown
```
-----BEGIN PGP SIGNATURE-----
Version: GnuPG v1.4.14 (GNU/Linux)

iQEcBAABAgAGBQJTriATAAoJEJEOHi8Q7zzzAZoH/jGIUIiY62XibEKN9tNe4w5i
dbIQdGENT8QR3OfsRqvX/LVJOMk3DHeZh6uYrTtg7WPhaMb8ThckrV8giI0HPhCe
qZLwbD63yMQGqlADcENJiYdvZwnwH2ZxmNTDnHCn0P7n9wDhzdqx6vDkdHjWs9ed
XSywCXyql5DexwqplypXkRhnVHCExyXn3sNTnU8d1kG+AAsCSzsmLNU8Es73FK36
jXP67pY4hNQWSXQtKpfrS2mj2mnuthhrT2EikxjVD97S3Fk7Z05cm95oLwKBAyJJ
s0QszuwlMG3xx7PQ4w/KIjgSqQA43ap23rej2aYs7q/RKM5yEle6lCmGNJHiH8Q=
=1Xow
-----END PGP SIGNATURE-----

```

<!-- END SIGNATURES -->

### Begin signed statement 

#### Expect

```
size  exec  file                     contents                                                        
            ./                                                                                       
50            .gitignore             15518c53e314172f50549b4a29fde9086008f784effc1a2e65b38f09fb1a1403
156           .travis.yml            2a87273f7b9ada9912539b7bf585aa135c065d5042a64077d9cff9194e9060d8
6088  x       Gruntfile.js           125ccda6108b5a59971a4a8af0a23c38af107f51e0b83373fd37f0d3053a6940
1080          LICENSE                cfec6a6c39832bb228b8f4622aefb14f08d3c0f02823238c7143c668c3acd898
241           README.md              fea24fab8c40ff16acbd7f4992d2366182a5fa1fb6f73f962880634f1c13b01c
832           bower.json             7a8b683a3a894a593e868c0dec1a321aed747243ce03819cc6f856ffc98376e4
602           component.json         b1678c49843eb85855ee8045b5c443fdb091fd2453b7423a3c361c21ebb7e6ea
              lib/                                                                                   
                examples/                                                                            
                  browser/                                                                           
678                 app.js           28309b9285a84efb6eb52e2bb664e04abcb6afa0f6ac12e26d42b765ea505d67
266                 bower.json       6387e55105b163c0c2e2a60d854ede62f2f57c21eccff637faa8dcc8d5e9b840
669                 index.html       823717c6c8312f2c9353a7aa2a1fe1da8fa544dc0e445688fdfd35f07401a632
                  nodejs/                                                                            
262                 app.js           c499853e75d24fb156e39312063067b985ac18a7c97d3f927de727c3827bf19f
256                 package.json     f97cdb867a0e853a9b6c1aa0c6e0be0ed1b660d1c0d2ba137cb5113ab04060e8
                  requirejs/                                                                         
                    browser/                                                                         
767                   app.js         1a28dfe5b2928b64346cb7d1da863bef614e8d22ae0bb6007edc98319f78b96e
314                   bower.json     8bab89521cee02384c16af8943c3fb7a4763c1c6d37a5083e2e6ccc098118d94
821                   index.html     8762f6453ba7d16da94ca6c32b2ee5456a76fdae822635a46728d5ec2aec89ce
                    nodejs/                                                                          
468                   app.js         bedbfea8b04db7526ac28c39f4a12b9d1737dd2eff9a9ba400569eed7c2414bf
307                   package.json   a1ce41dca36d01b12b8cd4dc9b050a0b0775d45f2bd5abfcee43d87d0a20aecf
6874            tann-oi.js           31053bd999caca1e50ae45169cd05c9e738029673ea4ee8d0dbe564c334bf1f7
                tests/                                                                               
1566              tann-oi.test.html  159a72794ed33f70d44ce03061df22241ef449debe216a65a1bebcf074262389
9181  x           tann-oi.test.js    1a70980f04716109968734cc4cbc98fa3833f526275ec16dbbe11d824e6daa6f
1208          package.json           2a40cd4f899466086a775c72d4fd8c91ca4a66f14f03dde2e3480f29d7730279
2478          tann-oi.min.js         f3ec6a67c782598e5674f340a0eefe1e253d3bbcf47ebc24cbb93ce54b1df6a3
```

#### Ignore

```
/SIGNED.md
```

#### Presets

```
git      # ignore .git and anything as described by .gitignore files
dropbox  # ignore .dropbox-cache and other Dropbox-related files    
kb       # ignore anything as described by .kbignore files          
```

<!-- summarize version = 0.0.9 -->

### End signed statement

<hr>

#### Notes

With keybase you can sign any directory's contents, whether it's a git repo,
source code distribution, or a personal documents folder. It aims to replace the drudgery of:

  1. comparing a zipped file to a detached statement
  2. downloading a public key
  3. confirming it is in fact the author's by reviewing public statements they've made, using it

All in one simple command:

```bash
keybase dir verify
```

There are lots of options, including assertions for automating your checks.

For more info, check out https://keybase.io/docs/command_line/code_signing