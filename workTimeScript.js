function CreateEmptyTimeCheckingRow(taskIndex) {
	
	var inputTask = $('<input />', {
		type: 'text',
		idtype: 'inputTask',
		id: 'inputTask' + taskIndex
	})
	.css({
		width: '250px'
	});
	
	var tdTask = $('<td></td>', {
		colspan: 2
	})
	.append(inputTask);
	
	
	
	var inputTime = $('<input />', {
		type: 'text',
		idtype: 'inputTime',
		id: 'inputTime' + taskIndex + '-0'
	})
	.css({
		width: '70px'
	});

	
	var iconTime = $('<i class="material-icons">play_arrow</i>');
	
	var buttonTime = $('<button></button>', {
		'class': 'mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect',		
		idtype: 'buttonTime',
		id: 'buttonTime' + taskIndex + '-0'
	})
	.append(iconTime);
	
	var tdTime = $('<td></td>', {
		'class': 'subtaskTd'
	})
	.css({
		textAlign: 'center'
	})
	.append(inputTime, buttonTime);
	
	
	
	var inputComment = $('<input />', {
		type: 'text',
		idtype: 'inputComment',
		id: 'inputComment' + taskIndex + '-0'
	})
	.css({
		width: '200px'
	});
	
	var iconAddSubtask = $('<i class="material-icons" >add</i>');
	
	var buttonAddSubtask = $('<button></button>', {
		'class': 'mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect mdl-button--accent',
		idtype: 'buttonAddSubtask',
		id: 'buttonAddSubtask' + taskIndex + '-0'
	})
	.append(iconAddSubtask);
	
	var tdComment = $('<td></td>', {
		colspan: 2,
		'class': 'time subtaskTd'
	})
	.append(inputComment, buttonAddSubtask);
	
	
	
	var iconCloseSubtask = $('<i class="material-icons" >close</i>');
	
	var buttonCloseSubtask = $('<button></button>', {
		'class': 'mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect',
		idtype: 'buttonCloseSubtask',
		id: 'buttonCloseSubtask' + taskIndex + '-0'
	})
	.append(iconCloseSubtask);
	
	var tdCloseSubtask = $('<td></td>', {
		'class': 'time subtaskTd'
	})
	.append(buttonCloseSubtask);
	
	
	
	var iconDeleteTask = $('<i class="material-icons" >delete</i>');
	
	var buttonDeleteTask = $('<button></button>', {
		'class': 'mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect',
		idtype: 'buttonDeleteTask',
		id: 'buttonDeleteTask' + taskIndex
	})
	.append(iconDeleteTask);
	
	var tdDeleteTask = $('<td></td>', {
	})
	.append(buttonDeleteTask);
	
	var tr = $('<tr></tr>', {
		'class': 'trTimeChecker task',
		idtype: 'trTimeChecker',
		subtaskcount: 1,
		taskindex: taskIndex,
		id: 'trTimeChecker' + taskIndex
	})
	.append(tdTask, tdTime, tdComment, tdCloseSubtask, tdDeleteTask);	
	
	
	
	componentHandler.upgradeElement(buttonTime.get(0));
	componentHandler.upgradeElement(buttonCloseSubtask.get(0));
	componentHandler.upgradeElement(buttonAddSubtask.get(0));
	componentHandler.upgradeElement(buttonDeleteTask.get(0));
	
	return tr;
	
	
	/*
	<tr class="trTimeChecker" style="display: table-row;">
		<td rowspan="2" colspan="2" >
			<input type="text" style="width: 250px;" value="Best Buy Survey Development" />
		</td>
		<td style="text-align: center;">
			<input type="text" style="width: 70px;" value="0:27" />
			<i class="material-icons" style="font-size: 17px;">play_arrow</i>
		</td>
		
		
		<td colspan="2" class="time" >
			<input type="text" style="width: 200px;" value="Meeting" />
		</td>
		<td class="time" style="display: none;"></td>
		<td class="time" style="display: none;"></td>
		<td class="time" style="display: none;"></td>
		<td class="time" >
			<i class="material-icons" >close</i>
		</td>
		<td >
			<i class="material-icons">delete</i>
		</td>
	</tr>*/
}

function CreateSubtaskRow(taskIndex, subtaskIndex) {

	var inputTime = $('<input />', {
		type: 'text',
		idtype: 'inputTime',
		id: 'inputTime' + taskIndex + '-' + subtaskIndex
	})
	.css({
		width: '70px'
	});

	
	var iconTime = $('<i class="material-icons">play_arrow</i>');
	
	var buttonTime = $('<button></button>', {
		'class': 'mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect',		
		idtype: 'buttonTime',
		id: 'buttonTime' + taskIndex + '-' + subtaskIndex
	})
	.append(iconTime);
	
	var tdTime = $('<td></td>', {
		'class': 'subtaskTd'
	})
	.css({
		textAlign: 'center'
	})
	.append(inputTime, buttonTime);
	
	
	
	var inputComment = $('<input />', {
		type: 'text',
		idtype: 'inputComment',
		id: 'inputComment' + taskIndex + '-' + subtaskIndex
	})
	.css({
		width: '200px'
	});
	
	var iconAddSubtask = $('<i class="material-icons" >add</i>');
	
	var buttonAddSubtask = $('<button></button>', {
		'class': 'mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect mdl-button--accent',
		idtype: 'buttonAddSubtask',
		id: 'buttonAddSubtask' + taskIndex + '-' + subtaskIndex
	})
	.append(iconAddSubtask);
	
	var tdComment = $('<td></td>', {
		colspan: 2,
		'class': 'time subtaskTd'
	})
	.append(inputComment, buttonAddSubtask);
	
	
	
	var iconCloseSubtask = $('<i class="material-icons" >close</i>');
	
	var buttonCloseSubtask = $('<button></button>', {
		'class': 'mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect',
		idtype: 'buttonCloseSubtask',
		id: 'buttonCloseSubtask' + taskIndex + '-' + subtaskIndex
	})
	.append(iconCloseSubtask);
	
	var tdCloseSubtask = $('<td></td>', {
		'class': 'time subtaskTd'
	})
	.append(buttonCloseSubtask);
	
	
	var tr = $('<tr></tr>', {
		'class': 'trTimeChecker subtask',
		idtype: 'trTimeChecker',
		taskindex: taskIndex,
		subtaskIndex: subtaskIndex,
		id: 'trTimeChecker' + taskIndex + '-' + subtaskIndex
	})
	.append(tdTime, tdComment, tdCloseSubtask);	
	
	
	
	componentHandler.upgradeElement(buttonTime.get(0));
	componentHandler.upgradeElement(buttonCloseSubtask.get(0));
	componentHandler.upgradeElement(buttonAddSubtask.get(0));
	
	return tr;
	
	
	/*
	<tr class="trTimeChecker" style="display: table-row;">
		<td rowspan="2" colspan="2" >
			<input type="text" style="width: 250px;" value="Best Buy Survey Development" />
		</td>
		<td style="text-align: center;">
			<input type="text" style="width: 70px;" value="0:27" />
			<i class="material-icons" style="font-size: 17px;">play_arrow</i>
		</td>
		
		
		<td colspan="2" class="time" >
			<input type="text" style="width: 200px;" value="Meeting" />
		</td>
		<td class="time" style="display: none;"></td>
		<td class="time" style="display: none;"></td>
		<td class="time" style="display: none;"></td>
		<td class="time" >
			<i class="material-icons" >close</i>
		</td>
		<td >
			<i class="material-icons">delete</i>
		</td>
	</tr>*/
}

function RecoundIds() {
	rowsIndex = 0;
			
	$('.task[idtype="trTimeChecker"]').each(
		function() {
			$(this).find('[idtype]').each(function() {
				var idType = $(this).attr('idtype');
				var id = idType + rowsIndex;
				if ($(this).parent().hasClass('subtaskTd')) {
					id += '-0';
				}
				$(this).attr('id', id);					
			});
			
			var oldTaskIndex = $(this).attr('taskindex');
			
			$(this).attr('id', 'trTimeChecker' + rowsIndex);
			$(this).attr('taskindex', rowsIndex);
			var subtaskCount = $(this).attr('subtaskcount');
			for (var i = 1; i < subtaskCount; i++) {
				RecoundIdsForSubtasksRows(+oldTaskIndex, +rowsIndex);
			}			
			
			rowsIndex++;
		}
	);
			
	return --rowsIndex;
}

function RecoundIdsForSubtasksRows(taskIndex, newTaskIndex) {
	subtaskIndex = 0;	
	
	var realIndex = (newTaskIndex === undefined) ? taskIndex : newTaskIndex;

	$('[id^="trTimeChecker' + taskIndex + '"]').each(
		function() {
			$(this).find('.subtaskTd [idtype]').each(function() {
				var idType = $(this).attr('idtype');
				var id = idType + realIndex + '-' + subtaskIndex;
				$(this).attr('id', id);					
			});
			
			$(this).attr('taskindex', realIndex);
			
			if ($(this).hasClass('subtask')) {
				$(this).attr('id', 'trTimeChecker' + realIndex + '-' + subtaskIndex);
				$(this).attr('subtaskindex', subtaskIndex);
			}
			
			subtaskIndex++;
		}
	);	
	
	return subtaskIndex;
}

function CheckRowsNumber(lastRowIndex) {
	var mainRow = $('#trTimeChecker' + lastRowIndex);
	var subtaskCount = mainRow.attr('subtaskcount');
	
	var isAnyInputHasVal = ($('#inputTask' + lastRowIndex).val() != '');
	for (var i = 0; i < subtaskCount; i++) {
		isAnyInputHasVal = isAnyInputHasVal 
			|| ($('#inputComment' + lastRowIndex + '-' + i).val() != '')
			|| ($('#inputTime' + lastRowIndex + '-' + i).val() != '');
	}
	
	if (isAnyInputHasVal && $('#trTimeChecker' + (lastRowIndex + 1)).length <= 0) 
	{		
		var selector = '#trTimeChecker' + lastRowIndex;
		var lastSubtaskIndex = +$(selector).attr('subtaskcount') - 1;
		if (lastSubtaskIndex != 0) {
			selector += '-' + lastSubtaskIndex;
		}
		$(selector).after(CreateEmptyTimeCheckingRow(++lastRowIndex));
	} else {
		for (var i = 0; i < lastRowIndex; i++) {
			var currentRow = $('#trTimeChecker' + i);
			var subtaskCount = currentRow.attr('subtaskcount');
	
			var isAnyInputHasValIndex = ($('#inputTask' + i).val() != '');
			for (var j = 0; j < subtaskCount; j++) {
				isAnyInputHasValIndex = isAnyInputHasValIndex 
					|| ($('#inputComment' + i + '-' + j).val()  != '')
					|| ($('#inputTime' + i + '-' + j).val() != '');
			}			
			
			if (!isAnyInputHasValIndex) {
				$('[idtype=trTimeChecker][taskindex=' + i + ']').remove();
			}				
		}
	}	
	
	return lastRowIndex;
}

function ShiftSubtask(taskIndex) {
	var mainRow = $('#trTimeChecker' + taskIndex);
	var subtaskCount = mainRow.attr('subtaskcount');
	var previousRow = mainRow;
	
	for (var i = 1; i < subtaskCount; i++) {
		var currentRow = $('#trTimeChecker' + taskIndex + '-' + i);
		var previousSubtaskTds = previousRow.find('td.subtaskTd');
		currentRow.find('td.subtaskTd').each(function(index) {
			$(previousSubtaskTds[index]).children('input').val($(this).children('input').val());
		})
		
		previousRow = currentRow;
	}
	
	currentRow.remove();
}

$(document).ready ( function() {
	var rowsIndex = 0;
	var firstRow = CreateEmptyTimeCheckingRow(+rowsIndex);
	$('table.full-size tr[id]').not('.future').last().after(firstRow);
	
	$(document).on('propertychange input change keyup paste click', '[idtype="inputTask"], [idtype="inputComment"], [idtype="inputTime"]',
		function() 
		{	
			rowsIndex = CheckRowsNumber(rowsIndex);		
			rowsIndex = RecoundIds();
		}
	);
	
	$(document).on('click', '[idtype="buttonDeleteTask"]', 
		function() {	

			var mainTr = $(this).parent().parent();
			$('.subtask[id^="' + mainTr.attr('idtype') + mainTr.attr('taskindex') + '"]').remove();
			mainTr.find('[idtype="inputTask"], [idtype="inputComment"], [idtype="inputTime"]').val('');
			
			
			if (rowsIndex == 0)
				return;
			
			mainTr.remove();
			
			rowsIndex = RecoundIds();			
			rowsIndex = CheckRowsNumber(rowsIndex);	
		}	
	);
	
	$(document).on('click', '[idtype="buttonAddSubtask"]', 
		function() {
			var indexes = $(this).attr('id').replace('buttonAddSubtask', '');
			var taskStrIndex = indexes.indexOf('-');
			var taskIndex = indexes.substr(0, taskStrIndex);
			//var subtaskIndex = indexes.substr(taskStrIndex + 1);
			
			var mainRow = $('#trTimeChecker' + taskIndex);
			var newSubtaskIndex = mainRow.attr('subtaskcount');
			var tr = $(this).parent().parent();		
			tr.after(CreateSubtaskRow(+taskIndex, +newSubtaskIndex));
			
			mainRow.attr('subtaskcount', +newSubtaskIndex + 1);
			mainRow.children('td').first().attr('rowspan', +newSubtaskIndex + 1);			
			mainRow.children('td').last().attr('rowspan', +newSubtaskIndex + 1);
			
			RecoundIdsForSubtasksRows(+taskIndex);
		}	
	);
	
	$(document).on('click', '[idtype="buttonCloseSubtask"]', 
		function() {
			var indexes = $(this).attr('id').replace('buttonCloseSubtask', '');
			var taskStrIndex = indexes.indexOf('-');
			var taskIndex = indexes.substr(0, taskStrIndex);
			
			var mainRow = $('#trTimeChecker' + taskIndex);
			var currentRow = $(this).parent().parent();
			currentRow.find('[idtype="inputComment"], [idtype="inputTime"]').val("");
			var subtaskCount = mainRow.attr('subtaskcount');
			
			if (subtaskCount == 1) {
				rowsIndex = CheckRowsNumber(rowsIndex);		
				rowsIndex = RecoundIds();
				return;
			}
			
			if (currentRow.attr('id') == 'trTimeChecker' + taskIndex) {
				ShiftSubtask(taskIndex);
			} else {
				currentRow.remove();	
			}
			
			
			mainRow.attr('subtaskcount', +subtaskCount - 1);
			mainRow.children('td').first().attr('rowspan', +subtaskCount - 1);			
			mainRow.children('td').last().attr('rowspan', +subtaskCount - 1);
						
			RecoundIdsForSubtasksRows(+taskIndex);
			
			rowsIndex = CheckRowsNumber(rowsIndex);		
			rowsIndex = RecoundIds();
		}	
	);
	
});