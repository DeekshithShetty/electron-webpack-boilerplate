!macro preInit
	SetRegView 64
	WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "$LocalAppData\Programs\${PRODUCT_FILENAME}"
	WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "$LocalAppData\Programs\${PRODUCT_FILENAME}"
	SetRegView 32
	WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "$LocalAppData\Programs\${PRODUCT_FILENAME}"
	WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "$LocalAppData\Programs\${PRODUCT_FILENAME}"
!macroend