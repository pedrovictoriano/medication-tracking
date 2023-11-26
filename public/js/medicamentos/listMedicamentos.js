$(document).ready(function () {
    $('#listMedicamentos').DataTable({
        "ajax": "/api/medicamentos",
        "columns": [
            { "data": "medicamento_id" },
            { "data": "fabricante_nome" },
            { "data": "medicamento_nome_comercial" },
            { "data": "medicamento_nome_generico" },
            { "data": "forma_farmaceutica_descricao" },
            {
                "data": "id",
                "render": function (data, type, row) {
                    return `
                        <div class="btn-group btn-group-sm">
                            <button type="button" class="btn btn-outline-secondary btn-update-lote" data-lote-id="${data}">
                              <i class="fas fa-pen"></i>
                            </button>
                            <button type="button" class="btn btn-outline-info btn-view-lote" data-lote-id="${data}">
                              <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    `;
                }
            }

        ],
        "order": [[0, "desc"]] ,
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
            },
            {
                "targets": 4, // Indica a última coluna
                "className": "dt-center",
                "width": "120px", // Defina a largura que deseja
                "searchable": false // Se você não quer que a coluna seja pesquisável
            }
        ]

    });

});