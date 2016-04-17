var Y_DELTA_LINE_X_VALUE = 2;

function integrate(func){
    var D = JXG.Math.Numerics.I([-20,0],func)
    return function(x){
        return JXG.Math.Numerics.I([-20,x],func) - D;
    };
}

function createGraphs(){
    var formulatText = document.getElementById("formula").value;
    var nerdamerFormula = nerdamer(formulatText);
    var quadratic = nerdamerFormula.buildFunction();

    //create board for second graph
    var brd = JXG.JSXGraph.initBoard('derivative', {boundingbox:[-3,10,3,-3],axis:true});

    //make functiongraph from quadratic equation above
    var plot = brd.create('functiongraph',[quadratic,-20,20]);

    //create first glider
    var glider1 = brd.create('glider',[plot],{name:'A'});
    glider1.setPositionDirectly(JXG.COORDS_BY_USER, [0, quadratic(0)]);
    glider1.prepareUpdate().update().updateRenderer();

    //create second glider
    var glider2 = brd.create('glider',[plot],{name:'B'});
    glider2.setPositionDirectly(JXG.COORDS_BY_USER, [1, quadratic(1)]);
    glider2.prepareUpdate().update().updateRenderer();

    //create integral
    var int = brd.create('integral',[[function(){return glider1.X();},function(){return glider2.X();}],plot],{fillOpacity:0.2});


    //create board for second graph
    var brd2 = JXG.JSXGraph.initBoard('integral', {boundingbox:[-3,10,3,-3],axis:true});

    //create integral from quadratic function, and then make a functiongraph from it
    var integral = integrate(quadratic);
    var brd2_plot = brd2.create('functiongraph',[integral,-100,100]);

    //create first glider
    var brd2_glider1 = brd2.create('glider',[brd2_plot],{name:'A'});
    brd2_glider1.setPositionDirectly(JXG.COORDS_BY_USER, [0, integral(0)]);
    brd2_glider1.prepareUpdate().update().updateRenderer();

    //create line for first glider
    var hidden_point1 = brd2.create('point', [Y_DELTA_LINE_X_VALUE,integral(0)], {name:'hidden1',visible:false}); //create hidden point to create line
    var line1 = brd2.create('line',[brd2_glider1, hidden_point1], {straightFirst:true, straightLast:true, strokeWidth:1, dash:2});


    //create second glider
    var brd2_glider2 = brd2.create('glider',[brd2_plot],{name:'B'});
    brd2_glider2.setPositionDirectly(JXG.COORDS_BY_USER, [1, integral(1)]);
    brd2_glider2.prepareUpdate().update().updateRenderer();

    //create line for second glider
    var hidden_point2 = brd2.create('point', [Y_DELTA_LINE_X_VALUE,integral(1)], {name:'hidden1',visible:false}); //create hidden point to create line
    var line2 = brd2.create('line',[brd2_glider2,hidden_point2], {straightFirst:true, straightLast:true, strokeWidth:1, dash:2});

    //create y delta line on board2
    var delta_line = brd2.create('line',[hidden_point1,hidden_point2],
        {
            straightFirst:false, straightLast:false,
            strokeWidth:1,
            firstArrow:true, lastArrow:true,
            dash:2
        });

    //create label for y delta line
    var delta_line_label_point = brd2.create('text',
        [
            Y_DELTA_LINE_X_VALUE +.1,
            function(){ return brd2_glider1.Y() + (brd2_glider2.Y()-brd2_glider1.Y())/2;},
            function(){ return "y delta = " + (brd2_glider2.Y()-brd2_glider1.Y()).toFixed(4);}
        ], {});


    //sync glider1 between both boards
    brd2_glider1.on('drag', function() {
        hidden_point1.moveTo([Y_DELTA_LINE_X_VALUE, brd2_glider1.Y()]);
        glider1.moveTo([brd2_glider1.X(), quadratic(brd2_glider1.X())]);
    });

    glider1.on('drag', function() {
        brd2_glider1.moveTo([glider1.X(), integral(glider1.X())]);
        hidden_point1.moveTo([Y_DELTA_LINE_X_VALUE, integral(glider1.X())]);
    });


    //sync glider2 between both boards
    brd2_glider2.on('drag', function() {
        hidden_point2.moveTo([Y_DELTA_LINE_X_VALUE, brd2_glider2.Y()]);
        glider2.moveTo([brd2_glider2.X(), quadratic(brd2_glider2.X())]);
    });

    glider2.on('drag', function() {
        brd2_glider2.moveTo([glider2.X(), integral(glider2.X())]);
        hidden_point2.moveTo([Y_DELTA_LINE_X_VALUE, integral(glider2.X())]);
    });
}

createGraphs();


function refreshOnClick(){
    createGraphs();
}

window.refreshOnClick = refreshOnClick;