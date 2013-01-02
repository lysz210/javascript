/*
 * 
 * Fa scorrere il primo text all'interno del primo textNode
 * all'interno dell'elemento
 *  
 */

(function($){
  // aggiungiamo la funzione shift direttamente al Node del dom
	var myApi  = {};
	myApi.normalize = function(){
		if(this.nodeType == 3){
			var tmp = this.nodeValue;
			tmp = tmp.replace(/^[\s]+|[\s]+$/g, '');   // elimina spazi in testa e coda
			tmp = tmp.replace(/[\s]+/g, '_');      // Mette un singolo spazio tra le parole
			this.nodeValue = tmp;
		}
		this.normalized = true;
	}
	myApi.shift = function(){
		if(this.nodeType == 3){
			if(!this.normalized){
				alert('Normalize text before!!');
				return;
			}
			var tmp = this.nodeValue;
			var tmpCH = tmp.slice(0,1);
			tmp = tmp.slice(1).concat(this.shiftedCH);
			this.shiftedCH = tmpCH;
			this.nodeValue = tmp;
		}
	}
	$.extend(Node.prototype, {normalized: false, shiftedCH: '_'});
	$.fn.scrollText = function(){
		$(this).each(function(){
			if(this.firstChild && this.firstChild.nodeType == 3 && this.firstChild.nodeValue.match(/[^\s]/g)){
				var txt = this.firstChild;
				if(!txt.normalized){
					myApi.normalize.call(txt);
				}
				window.setInterval(function(){
					myApi.shift.call(txt);
				}, 100);
			}
			
		});
	}
})(jQuery);
