$(document).ready(function () {
    $('#listLotes').DataTable({
        "ajax": "/api/lotes",
        "columns": [
            { "data": "id" },
            { "data": "numero_lote" },
            {
                "data": "data_fabricacao", "render": function (data, type, row) {
                    // Formatar data
                    return new Date(data).toLocaleDateString();
                }
            },
            {
                "data": "data_validade", "render": function (data, type, row) {
                    // Formatar data
                    return new Date(data).toLocaleDateString();
                }
            },
            {
                "data": "dias_para_vencer",
                "render": function(data, type, row) {
                    if (data > 90) {
                        return `<span class="badge bg-primary">${data}</span>`;
                    } else if (data <= 90 && data > 60) {
                        return `<span class="badge bg-warning">${data}</span>`;
                    } else if (data <= 60 && data > 30) {
                        return `<span class="badge bg-orange" style="color: white !important">${data}</span>`;
                    } else {
                        return `<span class="badge bg-danger">${data}</span>`;
                    }
                }
            },    
            { "data": "id" },
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
                "width": "140px", // Defina a largura que deseja
                "searchable": false // Se você não quer que a coluna seja pesquisável
            }
        ]

    });

});