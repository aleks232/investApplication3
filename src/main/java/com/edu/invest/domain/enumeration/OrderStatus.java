package com.edu.invest.domain.enumeration;

/**
 * The OrderStatus enumeration.
 */
public enum OrderStatus {
    // выбран лот и способ оплаты
    CREATED,
    // подписание сторон в электронном виде
    SIGN_ONLINE,
    // сформирован и отправлен счет на оплату
    PAYMENT_CREATED,
    // сформирован и отправлен пакет документов
    CREATED_PACKAGE,
    // подготовлены и подписаны документы физически
    SIGN_PERSON,
    // отредактирован бюджет
    EDIT_BUDGET,
    // сформированы счета по выплатам
    PAYMENT_CREATED_DECISION,
    // подписаны платежные поручения о выплатах дивидендов
    PAY_DIVIDENTS,
}
