$(document).ready(function(){	
			function round_zero_decimal_digits(num1){
				return Math.round(parseFloat(num1)) ;
			}
			function round_2_digits(num1){
				return Math.round( parseFloat(num1) * 100 ) / 100;
			}
			function numberWithCommas(x) {
				return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}

			$("#priceCalcForm").validate({
			  rules: {
				// simple rule, converted to {required:true}
				c_price: {
					required: true,
					number: true,
					min: 1,
					max: 9999999
				},
				main_date: {
					required: true,
				},
				project_name: {
					required: true,
				},
				project_email: {
					required: true,
				},
				
			  }
			});
			
	
	
			var totalDueSum , amount1;
			 jQuery(".price_input_sum").change(function () {
				   totalDueSum = 0;
				   jQuery('.price_input_sum').each(function(i, obj) {
					    amount1 = this.nodeName.toLowerCase() === 'input' ? jQuery(this).val() : jQuery(this).find('option:selected').val();
						totalDueSum += Number(amount1);
						console.log(amount1);
					});
					
					jQuery('#totalDue').val(totalDueSum);
			   });
			   
			   
			    jQuery("#retainer_paid").change(function () {
					
					let fifty_input_due_1 =  ( Number( totalDueSum ) - Number( jQuery(this).val() ) ) / 2 ;
					jQuery('#fifty_due_1').val( fifty_input_due_1 );
					
					let fifty_input_remaining_1 = Number( totalDueSum ) - Number( jQuery(this).val() ) - fifty_input_due_1;

					jQuery('#fifty_remaining_1').val(fifty_input_remaining_1);
				
			   });
			
			
		
			
				
			jQuery( "#price_calc_btn" ).click(function( event ){

				event.preventDefault();
				
				var validator = $( "#priceCalcForm" ).validate();
					if( ! validator.form() ){
						$('html, body').animate({
							scrollTop: $("body").offset().top
						}, 1000);
						return;

					} 
				

			//----------------------   Header ---------------------------

	
				var main_date = jQuery('#main_date').val();
				var project_name = jQuery('#project_name').val();
				var project_email = jQuery('#project_email').val();
				var kitchen_designer = jQuery('#kitchen_designer option:selected').val();


				jQuery('#pdf_main_date').text(main_date);
				jQuery('#pdf_project_name').text(project_name);
				jQuery('#pdf_project_email').text(project_email);
				jQuery('#pdf_kitchen_designer').text(kitchen_designer);
				
				
				//----------------------   Cabinetry ---------------------------
				
				var c_vendor = jQuery('#c_vendor').val();
				var c_doorstyle = jQuery('#c_doorstyle').val();
				var c_finish = jQuery('#c_finish').val();
				var c_notes = jQuery('#c_notes').val();
				
				jQuery('#pdf_c_vendor').text(c_vendor);
				jQuery('#pdf_c_doorstyle').text(c_doorstyle);
				jQuery('#pdf_c_finish').text(c_finish);
				jQuery('#pdf_c_notes').text(c_notes);
				
				
				//--------------------  Bill To -----------------------------
				
				var b_name_1 = jQuery('#b_name_1').val();
				var b_address_1 = jQuery('#b_address_1').val();
				var b_address_2 = jQuery('#b_address_2').val();
				var b_phone_1 = jQuery('#b_phone_1').val();
				
				jQuery('#pdf_b_name_1').text(b_name_1);
				jQuery('#pdf_b_address_1').text(b_address_1);
				jQuery('#pdf_b_address_2').text(b_address_2);
				jQuery('#pdf_b_phone_1').text(b_phone_1);
				
				
				//--------------------  Ship To -----------------------------
				
				var s_address_1 = jQuery('#s_address_1').val();
				var s_address_2 = jQuery('#s_address_2').val();
				var s_name_1 = jQuery('#s_name_1').val();
				var s_phone_1 = jQuery('#s_phone_1').val();
				
				jQuery('#pdf_s_address_1').text(s_address_1);
				jQuery('#pdf_s_address_2').text(s_address_2);
				jQuery('#pdf_s_name_1').text(s_name_1);
				jQuery('#pdf_s_phone_1').text(s_phone_1);
				
				
				
				//--------------------  Calculations -----------------------------
				
				var c_price = Number( jQuery('#c_price').val() );
				var sales_tax = Number( jQuery('#sales_tax option:selected').val() );
				sales_tax = c_price * sales_tax;

				var delivery = Number( jQuery('#delivery').val() );
				var installation = Number( jQuery('#installation').val() );
				
				var totalDue = c_price + sales_tax + delivery + installation;
				
				jQuery('#pdf_c_price').text(c_price);
				jQuery('#pdf_sales_tax').text(sales_tax);
				jQuery('#pdf_delivery').text(delivery);
				jQuery('#pdf_installation').text(installation);
				
				jQuery('#pdf_totalDue').text(totalDue);
				
				
				var retainer_paid = Number( jQuery('#retainer_paid').val() );
				var retainer_paid_date =  jQuery('#retainer_paid_date').val() ;
				
				
				jQuery('#pdf_retainer_paid').text(retainer_paid);
				jQuery('#pdf_retainer_paid_date').text(retainer_paid_date);
				
				var fifty_due_1 = (totalDue - retainer_paid ) / 2;
				var fifty_due_1_date =  jQuery('#fifty_due_1_date').val() ;
				
				jQuery('#pdf_fifty_due_1').text(fifty_due_1);
				jQuery('#pdf_fifty_due_1_date').text(fifty_due_1_date);
				
				
				
				var fifty_remaining_1 = totalDue - retainer_paid - fifty_due_1;
				var fifty_remaining_1_date =  jQuery('#fifty_remaining_1_date').val() ;
				
				jQuery('#pdf_fifty_remaining_1').text(fifty_remaining_1);
				jQuery('#pdf_fifty_remaining_1_date').text(fifty_remaining_1_date);
				
				

				printJS('editor', 'html');
			
				
								
			});	
			
});
