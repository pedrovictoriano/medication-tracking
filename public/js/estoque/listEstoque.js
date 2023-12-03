$(document).ready(function () {
    var table = $('#listEstoque').DataTable({
        "ajax": "/api/estoque",
        "columns": [
            { "data": "id" },
            { "data": "tipo_movimentacao_descricao" },
            { "data": "documento" },
            { "data": "data_movimentacao_formatada" },
            {
                "data": "id",
                "render": function (data, type, row) {
                    return `
                        <div class="btn-group btn-group-sm">
                            <button type="button" class="btn btn-outline-secondary btn-update-estoque" data-estoque-id="${data}">
                              <i class="fas fa-pen"></i>
                            </button>
                            <button type="button" class="btn btn-outline-info btn-view-estoque" data-estoque-id="${data}">
                              <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    `;
                }
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Portuguese-Brasil.json"
        },
        "columnDefs": [
            {
                "targets": -1, // Indica a última coluna
                "className": "dt-center",
                "width": "100px", // Defina a largura que deseja
                "orderable": false, // Se você não quer que a coluna seja ordenável
                "searchable": false // Se você não quer que a coluna seja pesquisável
            }
        ]
    });

    new $.fn.dataTable.FixedHeader(table);
});