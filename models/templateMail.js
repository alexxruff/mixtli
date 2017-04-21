'use strict';

module.exports = (sol) => {
  return (`
    <body paddingwidth="0" paddingheight="0"   style="padding-top: 0; padding-bottom: 0; padding-top: 0; padding-bottom: 0; background-repeat: repeat; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased;" offset="0" toppadding="0" leftpadding="0">
      <table bgcolor="#ffffff" width="100%" border="0" cellspacing="0" cellpadding="0" class="tableContent" align="center"  style='font-family:Helvetica, Arial,serif;'>
    <tbody>
      <tr>
        <td><table width="600" border="0" cellspacing="0" cellpadding="0" align="center" bgcolor="#ffffff" class="MainContainer">
    <tbody>
      <tr>
        <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tbody>
      <tr>
        <td valign="top" width="40">&nbsp;</td>
        <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tbody>
    <!-- =============================== Header ====================================== -->
      <tr>
        <td height='75' class="spechide"></td>

          <!-- =============================== Body ====================================== -->
      </tr>
      <tr>
        <td class='movableContentContainer ' valign='top'>
          <div class="movableContent" style="border: 0px; padding-top: 0px; position: relative;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tbody>
      <tr>
        <td height="35"></td>
      </tr>
      <tr>
        <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tbody>
      <tr>
        <td valign="top" align="center" class="specbundle"><div class="contentEditableContainer contentTextEditable">
                                  <div class="contentEditable">
                                    <p style='text-align:center;margin:0;font-family:Georgia,Time,sans-serif;font-size:26px;color:#222222;'><span class="specbundle2"><span class="font1">Tienes un contacto nuevo</span></span></p>
                                  </div>
                                </div></td>
        <td valign="top" class="specbundle"><div class="contentEditableContainer contentTextEditable">
                                  <div class="contentEditable">
                                    <p style='text-align:center;margin:0;font-family:Georgia,Time,sans-serif;font-size:26px;color:#1A54BA;'><span class="font">${sol.body.nombre}</span> </p>
                                  </div>
                                </div></td>
      </tr>
    </tbody>
  </table>
  </td>
      </tr>
    </tbody>
  </table>
          </div>
          <div class="movableContent" style="border: 0px; padding-top: 0px; position: relative;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                            <tr>
                              <td valign='top' align='center'>
                                <div class="contentEditableContainer contentImageEditable">
                                </div>
                              </td>
                            </tr>
                          </table>
          </div>
          <div class="movableContent" style="border: 0px; padding-top: 0px; position: relative;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                            <tr><td height='55'></td></tr>
                            <tr>
                              <td align='left'>
                                <div class="contentEditableContainer contentTextEditable">
                                  <div class="contentEditable" align='center'>
                                    <h2 >${sol.body.email}</h2>
                                    <h2 >${sol.body.numero}</h2>
                                  </div>
                                </div>
                              </td>
                            </tr>

                            <tr><td height='15'> </td></tr>

                            <tr>
                              <td align='left'>
                                <div class="contentEditableContainer contentTextEditable">
                                  <div class="contentEditable" align='center'>
                                    <h3>Mensaje del Contacto:</h3>
                                    <p>
                                      ${sol.body.mensaje}
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </table>
          </div>
          <div class="movableContent" style="border: 0px; padding-top: 0px; position: relative;">
    `);
}
