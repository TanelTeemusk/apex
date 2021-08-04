# apex
Apex rakenduse proof of concept, mis tuvastab numbrimärke

Kliendilt kirjeldus:
1. Windows tabletile installida OpenALPR teenusena.
2. Brauseris kuvada tableti kaamera pilti (WebRTC)
3. Kasutaja suunab kaamera auto numbrimärgile ja vajutab nuppu "Tuvasta". Teeb pildi ja saadan OpenALPR teenusele, mis siis tagastab numbri, kui õnnestus lugeda. Täidab inputi saadud väärtusega.

Ok tegelt tuleb see APEX rakendusse integreerida ka aga selle jaoks on meil tööjõud olemas.

Vaja sellist asja:
Esialgne rakendus siis meie oma disainiga, mis kuvab Windows tabletis kaamera pildi (kuskil on nupp mis teeb pilti). Kui nupule vajutatakse siis tehakse foto, mis saadetakse kohalikku OpenALPR teenusesse ja saadakse vastena numbrimärk. Kui numbrimärk käes siis avame browseri uue lehekülje, kus on textfield milles on see numbrimärk täidetud.
