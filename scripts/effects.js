//placeholder for content

const yggdrasilCharge = newEffect(60, e => {
    Draw.color(Color.goldenrod, Color.orange, e.fin()); //color goes from white to light gray
    Lines.stroke(e.fin() * 12); //line thickness goes from 0 to 12
    Lines.circle(e.x, e.y, e.fout() * 20); //draw a circle whose radius goes from 20 to 0
});