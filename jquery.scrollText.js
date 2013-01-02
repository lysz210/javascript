/*
 * 
 * Fa scorrere il primo text all'interno del primo textNode
 * all'interno dell'elemento
 *  
 */

(function($){
  // funzioni che verrano usati per la gestione dello scorrimento
	var myApi  = {};
	/*
	 * funzione per eliminare tutti i spazi bianchi presenti nel testo che non sono renderizzati da html
	 * eventuali spazi bianchi tra le parole sono sostituiti da undercore
	 * evita l'eliminazione dello spazio ai limiti della stringa
	 */
	myApi.normalize = function(){
		if(this.nodeType == 3){
			var tmp = this.nodeValue;
			tmp = tmp.replace(/^[\s]+|[\s]+$/g, '');   // elimina spazi in testa e coda
			tmp = tmp.replace(/[\s]+/g, '_');      // Mette un undercore tra le parole al posto di eventuali spazi bianchi
			this.nodeValue = tmp;
		}
		this.normalized = true;         // notifica l'avvenuta normalizzazione del testo
	}
	/* Scorrimento a sinistra della stringa
	 * viene inserito un carattere(default underscore) per separare 
	 * le la testa e la coda della stringa iniziale
	 * e per mantenere la lunghezza iniziale si usa un supporto(shiftedCH)
	 * inserito direttamente tra gli attributi di un oggeto perche' sia sempre memorizzato
	 */
	myApi.shift = function(){
		if(this.nodeType == 3){
			// verifica che sono stati eliminati eventuali spazi bianchi non visualizzabili
			if(!this.normalized){
				alert('Normalize text before!!');
				return;
			}
			var tmp = this.nodeValue;
			var tmpCH = tmp.slice(0,1);                  // prende il primo char della string
			tmp = tmp.slice(1).concat(this.shiftedCH);   // aggiunge il char  precedentemente shiftato ed elimina il primo char
			this.shiftedCH = tmpCH;                      // memorizza il char shiftato per il prossimo ciclo
			this.nodeValue = tmp;
		}
	}
	
	/* inserisce gli attributi normalized e shiftedCH 
	 * direttamente al prototipo di Node
	 * normalizede indica se il testo e' gia normalizzato
	 * shiftedCH mantiene il char shiftato per usarlo al prossimo ciclo
	 * al primo ciclo fa da separatore tra le estremita' della stringa
	 */
	var extention = {normalized: false, shiftedCH: '_'};
	$.extend(Node.prototype, extention);
	
	/*
	 * inserimento del plugin scrollText all'interno di jQuery
	 */
	$.fn.scrollText = function(){
		// Cicla tutti gli elementi selezionati
		$(this).each(function(){
			/*
			 * verifica se esiste un TextNode all'interno dell'elemento come primo figlio
			 * e che il suo valore sia diverso da eventuali spazi bianchi
			 */
			if(this.firstChild && this.firstChild.nodeType == 3 && this.firstChild.nodeValue.match(/[^\s]/g)){
				var txt = this.firstChild;
				// richiamo di normalize nel caso non lo sia
				if(!txt.normalized){
					myApi.normalize.call(txt);
				}
				// avvio dello shift a intervalli regolari
				window.setInterval(function(){
					myApi.shift.call(txt);
				}, 100);
			}
			
		});
	}
})(jQuery);
